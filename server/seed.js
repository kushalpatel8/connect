import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from './models/userModel.js';
import PostModel from './models/postModel.js';

dotenv.config();

const users = [
  {
    firstname: 'Aria',
    lastname: 'Patel',
    email: 'aria.patel@demo.com',
    password: 'demo1234',
    worksAt: 'Google · UX Designer',
    livesin: 'Mumbai',
    country: 'India',
    relationship: 'Single',
    about: 'Design enthusiast & chai lover ☕',
  },
  {
    firstname: 'Liam',
    lastname: 'Chen',
    email: 'liam.chen@demo.com',
    password: 'demo1234',
    worksAt: 'Meta · Software Engineer',
    livesin: 'San Francisco',
    country: 'USA',
    relationship: 'In a relationship',
    about: 'Building things that matter 🚀',
  },
  {
    firstname: 'Sofia',
    lastname: 'Rivera',
    email: 'sofia.rivera@demo.com',
    password: 'demo1234',
    worksAt: 'Netflix · Product Manager',
    livesin: 'Barcelona',
    country: 'Spain',
    relationship: 'Married',
    about: 'Product thinker, storyteller, traveller 🌍',
  },
  {
    firstname: 'James',
    lastname: 'Okafor',
    email: 'james.okafor@demo.com',
    password: 'demo1234',
    worksAt: 'Spotify · Data Scientist',
    livesin: 'Lagos',
    country: 'Nigeria',
    relationship: 'Single',
    about: 'Music + Math = ❤️',
  },
  {
    firstname: 'Yuki',
    lastname: 'Tanaka',
    email: 'yuki.tanaka@demo.com',
    password: 'demo1234',
    worksAt: 'Freelance · Illustrator',
    livesin: 'Tokyo',
    country: 'Japan',
    relationship: 'Single',
    about: 'Drawing the world one pixel at a time 🎨',
  },
];

const postDescriptions = [
  "Just shipped a brand new feature after 3 weeks of hard work. The late nights were totally worth it! 🎉 #shipping #buildinpublic",
  "Had the most amazing coffee this morning while watching the sunrise. Little moments like these make life beautiful ☀️☕",
  "Exploring new design systems today. The way a great UI can tell a story is just incredible. Excited to share what I'm working on soon! 🎨",
  "Attended an amazing tech talk today — the future of AI in creative tools is mind-blowing. Can't stop thinking about the possibilities 🤖✨",
  "Weekend hike completed ✅ Nothing beats fresh air and good company. Feeling recharged and ready for the week ahead 🏔️",
  "Hot take: the best debugging tool is still a good night's sleep 😴 Come back with fresh eyes and the bug magically reveals itself.",
  "Just read an incredible book on human-centered design. If you haven't picked it up yet, do yourself a favour and grab a copy 📚",
  "Collaboration > competition. The best things I've built were always with an amazing team. Grateful for the people around me 🙌",
  "New playlist dropping — built it for late-night coding sessions. Links in bio if you want the vibe 🎵🌙",
  "Reminder: rest is productive. You can't pour from an empty cup. Take the break, you've earned it 💚",
];

// Local images from server/public/images (served at /images/<filename>)
const postImages = [
  '1686729699082img1.jpg',
  null,
  '1686730264474img2.jpg',
  null,
  '1686730403370img3.jpg',
  null,
  '1686730495691img5.jpg',
  null,
  '1686729790834pic.jpg',
  null,
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB connected');

    // ── Clean existing demo data ──────────────────────────────────────
    const demoEmails = users.map((u) => u.email);
    const existingUsers = await UserModel.find({ email: { $in: demoEmails } });
    const existingIds = existingUsers.map((u) => u._id.toString());

    if (existingIds.length > 0) {
      await PostModel.deleteMany({ userId: { $in: existingIds } });
      await UserModel.deleteMany({ email: { $in: demoEmails } });
      console.log(`🗑  Removed ${existingIds.length} previous demo users & their posts`);
    }

    // ── Create users ──────────────────────────────────────────────────
    const createdUsers = [];
    for (const u of users) {
      const hashedPass = await bcrypt.hash(u.password, 10);
      const saved = await UserModel.create({ ...u, password: hashedPass, followers: [], following: [] });
      createdUsers.push(saved);
      console.log(`👤 Created user: ${saved.firstname} ${saved.lastname}`);
    }

    // ── Build follow graph (each demo user follows the next two) ──────
    for (let i = 0; i < createdUsers.length; i++) {
      const followTargets = [
        createdUsers[(i + 1) % createdUsers.length],
        createdUsers[(i + 2) % createdUsers.length],
      ];
      const targetIds = followTargets.map((t) => t._id.toString());
      await UserModel.findByIdAndUpdate(createdUsers[i]._id, {
        $addToSet: { following: { $each: targetIds } },
      });
      for (const target of followTargets) {
        await UserModel.findByIdAndUpdate(target._id, {
          $addToSet: { followers: createdUsers[i]._id.toString() },
        });
      }
    }
    console.log('🤝 Follow relationships set');

    // ── Wire ALL existing real users to follow every demo account ─────
    const demoIds = createdUsers.map((u) => u._id.toString());
    const realUsers = await UserModel.find({ email: { $nin: users.map((u) => u.email) } });
    if (realUsers.length > 0) {
      for (const realUser of realUsers) {
        await UserModel.findByIdAndUpdate(realUser._id, {
          $addToSet: { following: { $each: demoIds } },
        });
      }
      await UserModel.updateMany(
        { _id: { $in: demoIds } },
        { $addToSet: { followers: { $each: realUsers.map((u) => u._id.toString()) } } }
      );
      console.log(`🔗 Linked ${realUsers.length} existing user(s) → all demo accounts`);
    }

    // ── Create posts (2 per user) ─────────────────────────────────────
    for (let i = 0; i < postDescriptions.length; i++) {
      const author = createdUsers[i % createdUsers.length];
      // random likes from other users
      const likers = createdUsers
        .filter((u) => u._id.toString() !== author._id.toString())
        .slice(0, Math.floor(Math.random() * 4));

      const post = await PostModel.create({
        userId: author._id.toString(),
        desc: postDescriptions[i],
        image: postImages[i] || undefined,
        likes: likers.map((l) => l._id.toString()),
      });
      console.log(`📝 Post ${i + 1}: "${post.desc.slice(0, 50)}..."`);
    }

    console.log('\n🌱 Seed complete! Demo credentials (password for all: demo1234)');
    console.log('─────────────────────────────────────────');
    for (const u of users) {
      console.log(`  ${u.firstname} ${u.lastname}  →  ${u.email}`);
    }
    console.log('─────────────────────────────────────────');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();
