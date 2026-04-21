import express from "express";
import { createPost, getPost, like_DislikePost, timeline, udatePost } from "../controllers/PostController";

const router = express.Router();
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', udatePost);
router.delete('/:id', deletePost);
router.put('/:id/like_dislike', like_DislikePost);
router.get('/timeline/:userId', timeline);

export default router;