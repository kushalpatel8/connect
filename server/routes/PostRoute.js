import express from "express";
import { createPost, getPost, like_DislikePost, timeline, udatePost, deletePost } from "../controllers/PostController.js";

const router = express.Router();
router.post('/', createPost);
router.get('/timeline/:userId', timeline);
router.get('/:id', getPost);
router.put('/:id', udatePost);
router.delete('/:id', deletePost);
router.put('/:id/like_dislike', like_DislikePost);

export default router;