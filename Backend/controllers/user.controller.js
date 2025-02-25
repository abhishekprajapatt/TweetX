import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: 'Somthing is missing!',
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: 'User already exist!',
        success: false,
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: 'Account Created Successfully!',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed register',
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Somthing is missing',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Incorrect Email.',
        success: false,
      });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Incorrect Password.',
        success: false,
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res
      .status(201)
      .cookie('token', token, { expiresIn: '1d', httpOnly: true })
      .json({
        message: 'Login Successfully',
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie('token', '', { expiresIn: new Date(Date.now()) })
      .json({
        message: 'Logout Successfully',
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};


export const bookmarks = async (req, res) => {
  try {
    const loginUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loginUserId);
    console.log(loginUserId);
    if (user.bookmarks.includes(tweetId)) {
      console.log(tweetId);
      await User.findByIdAndUpdate(loginUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: 'Remove Bookmarks!',
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(loginUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: 'Save Bookmarks!',
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};


export const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, username, bio, profilePicture, bannerPicture } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required',
        success: false,
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }
    
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;
    if (bannerPicture) user.bannerPicture = bannerPicture;
    
    await user.save();
    
    return res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(401).json({
        message: 'User Not Found.',
        success: false,
      });
    }
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error.',
      success: false,
    });
  }
};

export const getOthersUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      '-password'
    );
    if (!otherUsers) {
      return res.status(401).json({
        message: 'Current Not Have Any Users.',
        success: false,
      });
    }
    return res.status(200).json({
      otherUsers,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const loginUserId = req.body.id;
    const otherUserId = req.params.id;
    const loginUser = await User.findById(loginUserId);
    const otherUser = await User.findById(otherUserId);
    if (!otherUser.followers.includes(loginUserId)) {
      await otherUser.updateOne({ $push: { followers: loginUserId } });
      await loginUser.updateOne({ $push: { following: otherUserId } });
    } else {
      return res.status(400).json({
        message: `User already followed to ${otherUser?.name}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `${loginUser?.name} just follow to ${otherUser?.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error.',
      success: false,
    });
  }
};

export const unfollow = async (req, res) => {
  try {
    const loginUserId = req.body.id;
    const otherUserId = req.params.id;
    const loginUser = await User.findById(loginUserId);
    const otherUser = await User.findById(otherUserId);
    if (loginUser.following.includes(otherUserId)) {
      await otherUser.updateOne({ $pull: { followers: loginUserId } });
      await loginUser.updateOne({ $pull: { following: otherUserId } });
    } else {
      return res.status(400).json({
        message: `User has not followed yet ${otherUser?.name}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `${loginUser?.name} just unfollow to ${otherUser?.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};
