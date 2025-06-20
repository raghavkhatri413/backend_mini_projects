import express from 'express';
const app=express();
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import errorHandler from './middlewares/errorHandler.js'
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const port=process.env.PORT;

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);

app.use(errorHandler);
app.listen(port, () => {
    console.log("Server running on port: ", port)
});

export default app;