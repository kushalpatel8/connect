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

// get timeline posts
export const timeline = async (req, res) => {
    const userId = req.params.userId;
    try {
        const currUserPosts = await postModel.find({userId : userId});
        const followingUserPosts = await UserModel.aggregate(
            [
                {
                    $match : {
                        _id : new mongoose.Types.ObjectId(userId),
                    }
                },
                {
                    $lookup : {
                        from : "posts",
                        localField : "following",
                        foreignField : "userId",
                        as : "followingUserPosts",
                    }
                },
                {
                    $project : {
                        followingUserPosts : 1,
                        _id : 0,
                    }
                }
            ]
        );
        res.status(200).json(currUserPosts.concat(...followingUserPosts[0].followingUserPosts).sort((a,b) => {
            return b.createdAt - a.createdAt;
        }))
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}