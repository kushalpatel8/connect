import postModel from '../models/postModel.js';
import mongoose from 'mongoose';
import UserModel from '../models/userModel.js';

// Create a post
export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

// Get a post
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

// update a post
export const udatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if(post.userId === userId) {
            await post.updateOne({ $set : req.body });
            res.status(200).json("Post updated successfully");
        }
        else {
            res.status(403).json("Access denied! You can only update your own post");
        }
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

// delete a post
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post  = await postModel.findById(postId);
        if(post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        }
        else {
            res.status(403).json("Access denied! You can only delete your own post");
        }
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

// like and dislike a post
export const like_DislikePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if(!post.likes.includes(userId)) {
            await post.updateOne({ $push : { likes : userId }});
            res.status(200).json("Post liked");
        }
        else {
            await post.updateOne({ $pull : { likes : userId }});
            res.status(200).json("Post disliked");
        }
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

// Helper: enrich raw posts with author info in one aggregation
const enrichPostsWithAuthor = async (postIds) => {
    if (!postIds || postIds.length === 0) return [];
    return postModel.aggregate([
        { $match: { _id: { $in: postIds.map(id => new mongoose.Types.ObjectId(id.toString())) } } },
        {
            $lookup: {
                from: 'users',
                let: { uid: '$userId' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$uid' }] } } },
                    { $project: { firstname: 1, lastname: 1, profilePicture: 1 } }
                ],
                as: 'author'
            }
        },
        { $addFields: { author: { $arrayElemAt: ['$author', 0] } } },
        { $sort: { createdAt: -1 } }
    ]);
};

// get timeline posts
export const timeline = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Get own posts + following posts
        const currUserPosts = await postModel.find({ userId });

        const followingAgg = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'following',
                    foreignField: 'userId',
                    as: 'followingUserPosts',
                }
            },
            { $project: { followingUserPosts: 1, _id: 0 } }
        ]);

        let rawPosts = currUserPosts.concat(
            ...(followingAgg[0]?.followingUserPosts || [])
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Fallback: if feed is empty, surface demo posts
        if (rawPosts.length === 0) {
            const demoEmails = [
                'aria.patel@demo.com',
                'liam.chen@demo.com',
                'sofia.rivera@demo.com',
                'james.okafor@demo.com',
                'yuki.tanaka@demo.com',
            ];
            const demoUsers = await UserModel.find({ email: { $in: demoEmails } }, '_id');
            const demoIds = demoUsers.map((d) => d._id.toString());
            rawPosts = await postModel.find({ userId: { $in: demoIds } }).sort({ createdAt: -1 }).limit(10);
        }

        // Enrich all collected posts with author info
        const postIds = rawPosts.map(p => p._id);
        const enrichedPosts = await enrichPostsWithAuthor(postIds);

        res.status(200).json(enrichedPosts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
