import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

// routes
import authRoutes from './routes/api/auth';
import registerRoutes from './routes/api/register';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose
    .connect(config.ATLAS_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);

export default app;
