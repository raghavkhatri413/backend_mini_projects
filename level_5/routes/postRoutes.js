import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/verifyToken.js'
import { controllerCreatePost, controllerDeletePost, controllerGetPosts, controllerGetSinglePost, controllerUpdatePost } from '../controllers/post.controller.js';

router.post('/', verifyToken, controllerCreatePost);
router.get('/', controllerGetPosts);
router.get('/:id', controllerGetSinglePost);
router.put('/:id', verifyToken, controllerUpdatePost);
router.delete('/:id', verifyToken, controllerDeletePost);

export default router;