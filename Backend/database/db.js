import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: "./config/.env" });
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📊 Database Connected Successfully...!');
  } catch (error) {
    console.log('Database Not Connected...!');
    console.log(error);
  }
};

export default connectDB;
