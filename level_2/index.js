import pool from "./db.js";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Server is live!!");
})

//Get all notes
app.get('/notes-api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes_api');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//Get note by id
app.get('/notes-api/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const result = await pool.query('SELECT * FROM notes_api WHERE id=$1', [noteId]);
        if (!result) {
            return res.status(400).json({ error: "Note not found" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//Post a new note
app.post('/notes-api', async (req, res) => {
    try {
        const { newTitle, newContent } = req.body;

        if (!newTitle || !newContent) {
            return res.status(400).json({ error: "Title and content are required." });
        }

        const result = await pool.query(
            'INSERT INTO notes_api (title, content) VALUES ($1, $2) RETURNING *',
            [newTitle, newContent]
        );

        res.status(201).json({
            message: "Note added successfully",
            newNote: result.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//Update a note
app.put('/notes-api/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const allowedFields = ["title", "content"];
        const updates = [];
        const values = [];
        let index = 1;

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates.push(`${field}=$${index++}`);
                values.push(req.body[field]);
            }
        });

        if (updates.length === 0) {
            return res.status(400).json({ error: "No valid fields provided to update." });
        }

        values.push(noteId);
        const query = `update notes_api set ${updates.join(", ")} where id=$${index} returning *`;

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote: result.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//Delete a note
app.delete('/notes-api/:id',async (req,res)=>{
    try {
        const noteId=req.params.id;
        const result=await pool.query('delete from notes_api where id=$1',[noteId]);
        if(result.length===0){
            return res.status(400).json({ error: "Note not found" });
        }
        res.json({ message: "Note deleted", deleted: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

app.listen(port, () => {
    console.log("Server is running on port: ", port);
})