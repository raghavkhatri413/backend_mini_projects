import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
import pool from '../db.js';
const router = express.Router();

router.post('/uploads', verifyToken, upload.single('photo'), async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imgUrl=file.path;
        const result = await pool.query('insert into photos (user_id,title,image_url) values ($1,$2,$3)', [req.userId, title, imgUrl]);
        res.status(201).json({
            message: 'Image uploaded successfully',
            photo: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        return;
    }
});

router.get('/uploads', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('select * from photos where user_id=$1 order by created_at desc', [req.userId]);
        res.json({ photos: result.rows });
    } catch (error) {
        console.log(error);
    }
})

export default router;