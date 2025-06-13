import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

let notes = [
    {
        id: 1,
        title: "Note-1",
        content: "This is Note-1"
    },
    {
        id: 2,
        title: "Note-2",
        content: "This is Note-2"
    }
];

//Get all notes
app.get('/notes-api', (req, res) => {
    res.send(notes);
})

//Post a new note
app.post('/notes-api',(req,res)=>{
    try {
        const {title,content}=req.body;
        if(!title || !content){
            res.status(400).send("Content or title is not given.");
        }
        const newNote={
            id:Date.now(),
            title,
            content
        }
    
        notes.push(newNote);
        console.log(req.body);
        res.status(201).json({
            message:"Note created successfully",
            New_Note:newNote
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

//Get a note by id
app.get('/notes-api/:id',(req,res)=>{
    const note=notes.find(n=>n.id==req.params.id);
    if(!note){
        res.status(404).send("Note not found");
    }
    res.json(note);
})

//Update a note by id
app.put('/notes-api/:id',(req,res)=>{
    const note=notes.find(n=>n.id==req.params.id)
    if(!note){
        res.status(404).send("Note not found");
    }
    note.title=req.body.title;
    note.content=req.body.content;
    res.json(note);
})

//Delete a note by id
app.delete('/notes-api/:id',(req,res)=>{
    const noteId=parseInt(req.params.id);
    notes=notes.filter(n=>n.id!==noteId);
    res.send("Note deleted successfully");
})

app.listen(PORT, () => {
    console.log("Port is listening on", PORT);
})