import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';

dotenv.config({});
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use('/api/v1/user', userRoute);
app.get("/home",(req, res) => {
  res.status(200).json({
    message:"TweetX Server hai ji",
    success:true
  })
})

app.listen(PORT, () => {
  console.log(`🖥️  Backend Server Running on : ${PORT}`);
});
