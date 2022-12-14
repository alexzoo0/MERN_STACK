import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://alexzoo:Alexzoo%40$2784@cluster0.iiwud.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))) .catch((error) => console.log(`${error} did not connect`));



