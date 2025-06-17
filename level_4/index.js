import express from 'express';
const app = express();
app.use(express.json());
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import photosRoutes from './routes/photos.js';
const port = process.env.PORT;

app.use('/auth', authRoutes);

app.use('/', photosRoutes);

app.listen(port, () => {
    console.log("Server running on port: ", port)
});

export default app;