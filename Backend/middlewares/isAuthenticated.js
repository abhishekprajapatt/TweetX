import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: 'User is not Authenticated!',
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
        success: false,
      });
    }
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};

export default isAuthenticated;