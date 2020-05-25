import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import authRoutes from './routes/api/auth';
import registerRoutes from './routes/api/register';
import userRoutes from './routes/api/user';
import transactionRoutes from './routes/api/transaction';
import forgotPasswordRoutes from './routes/api/forgotPassword'
import resetRoutes from './routes/api/reset'
import updatePasswordRoutes from './routes/api/updatePassword'

export const authRoute = '/api/auth/';
export const registerRoute = '/api/register/';
export const userRoute = '/api/user/';
export const transactionRoute = '/api/transaction/';
export const forgotPasswordRoute ='/forgotPassword/';
export const resetRoute ='/reset/';
export const updatePasswordRoute ='/updatePassword/';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose.set('useFindAndModify', false);

mongoose
    .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(registerRoute, registerRoutes);
app.use(authRoute, authRoutes);
app.use(userRoute, userRoutes);
app.use(transactionRoute, transactionRoutes);
app.use(forgotPasswordRoute, forgotPasswordRoutes);
app.use(resetRoute, resetRoutes);
app.use(updatePasswordRoute, updatePasswordRoutes);

export default app;
