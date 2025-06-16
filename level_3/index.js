import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import authRoute from './routes/auth.js';
import notesRoute from './routes/notes.js';
const port=process.env.PORT;

app.use(express.json());

app.use('/auth',authRoute);
app.use('/notes',notesRoute);

app.listen(port,()=>{
    console.log("Server running on port: ",port)
})