import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/verifyToken.js'
import { controllerCreateComment, controllerDeleteComment, controllerGetAllCommentsByPostID, controllerUpdateComment } from '../controllers/comment.controller.js';

router.post('/',verifyToken,controllerCreateComment);
router.get('/:post_id',controllerGetAllCommentsByPostID);
router.put('/:id',verifyToken,controllerUpdateComment);
router.delete('/:id',verifyToken,controllerDeleteComment);

export default router;