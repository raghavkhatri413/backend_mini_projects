import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../models/postModel.js";
import appError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import express from 'express';
const app=express();
app.use(express.json());
export const controllerCreatePost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new appError('Title and content are required', 400);
    }

    const newPost = await createPost(title, content, req.user.id, req.user.username);
    res.status(201).json({ message: 'Post created', newPost });
});

export const controllerGetPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sort = 'desc', search = '' } = req.query;
    const offset = (page - 1) * limit;

    const posts = await getAllPost({ search, sort, limit:Number(limit), offset });
    res.json({ results: posts.length, posts });
});

export const controllerGetSinglePost = asyncHandler(async (req, res) => {
    const post = await getPostById(req.params.id);
    if (!post) {
        throw new appError('Post not found', 404);
    }
    res.json(post);
});

export const controllerUpdatePost = asyncHandler(async (req, res) => {
    const id = req.params.post_id;
    const post = await getPostById(id);
    if (!post) {
        throw new appError('Post not found', 404);
    }
    if (post.user_id !== req.user.id) {
        throw new appError('Unauthorized', 403);
    }
    const { title, content } = req.body;
    const updated = await updatePost(id, title, content);
    res.json({ message: 'Post updated', post: updated });
});

export const controllerDeletePost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) {
        throw new appError('Post not found', 404);
    }
    if (post.user_id !== req.user.id) {
        throw new appError('Unauthorized', 403);
    }
    await deletePost(id);
    res.json({ message: 'Post deleted' });
});