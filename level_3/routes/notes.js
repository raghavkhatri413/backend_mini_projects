import express from 'express';
const router = express.Router();
import pool from '../db.js';
import verifyToken from '../middleware/verifyToken.js';
router.use(express.json());

router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }
        const newNote = await pool.query('insert into notes (user_id,title,content) values ($1,$2,$3) returning *', [req.userId, title, content]);
        res.status(201).json({ note: newNote.rows[0] });
    } catch (error) {
        console.log(error);
    }
})

router.get('/', verifyToken, async (req, res) => {
    try {
        const note = await pool.query('select * from notes where user_id=$1', [req.userId]);
        res.json({ notes: note.rows });
    } catch (error) {
        console.log(error);
    }
})

export default router;