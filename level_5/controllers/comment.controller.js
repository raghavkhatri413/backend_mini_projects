import { addComment, deleteComment, getCommentById, getCommentForPost, updateComment } from '../models/commentModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import appError from '../utils/appError.js';
import express from 'express';
import { getPostById } from '../models/postModel.js';
const app = express();
app.use(express.json());

export const controllerCreateComment = asyncHandler(async (req, res) => {
    const { post_id, content } = req.body;
    if (!post_id || !content) {
        throw new appError('Post-ID and content are required', 401);
    }

    const newComment = await addComment(post_id, req.user.id, req.user.username, content);
    res.status(201).json({ message: 'Comment created', newComment });
});

export const controllerGetAllCommentsByPostID = asyncHandler(async (req, res) => {
    const post_id = req.params.post_id;
    const post=getPostById(post_id);
    if (!post) {
        throw new appError('Post does not exist', 401);
    }
    const comments = await getCommentForPost(post_id);
    res.status(201).json({ message: 'Comments for post_id:', post_id, comments });
});

export const controllerUpdateComment = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    const comment = await getCommentById(id);
    if (!comment) {
        throw new appError('Comment not found', 404);
    }
    if (comment.user_id !== req.user.id) {
        throw new appError('Unauthorized', 403);
    }
    const updatedComment = await updateComment(id, content);
    res.status(201).json({ message: 'Comment updated', updatedComment });
});

export const controllerDeleteComment=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const comment = await getCommentById(id);
    if (!comment) {
        throw new appError('Comment not found', 404);
    }
    if (comment.user_id !== req.user.id) {
        throw new appError('Unauthorized', 403);
    }
    await deleteComment(id);
    res.status(201).json({ message: 'Comment deleted'});
})