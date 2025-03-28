import sharp from 'sharp';
import { Tweet } from '../models/tweet.model.js';
import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';

export const CreateTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    const image = req.file;
    if (!description || !id) {
      return res.status(401).json({
        message: 'Fields are required!',
        success: false,
      });
    }

    // image upload
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: 'inside' })
      .toFormat('jpeg', { quality: 80 })
      .toBuffer();

    // buffer to data uri
    const fileUri = `data:image/jpg;base64,${optimizedImageBuffer.toString(
      'base64'
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const user = await User.findById(id).select('-password');
    await Tweet.create({
      description,
      image: cloudResponse.secure_url,
      userId: id,
      userDetails: user,
    });
    return res.status(200).json({
      message: 'New Tweet added!',
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
export const DeleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Tweet deleted successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const LikeOrDislike = async (req, res) => {
  try {
    const loginUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loginUserId)) {
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loginUserId } });
      return res.status(200).json({
        message: 'Tweet is disliked!',
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loginUserId } });
      return res.status(200).json({
        message: 'Tweet is liked!',
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

export const getAllTweets = async (req, res) => {
  try {
    const id = req?.params?.id;
    const loggedInUser = await User?.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const loggedInUserTweets = await Tweet?.find({ userId: id });
    const followingUserTweet =
      loggedInUser?.following?.length > 0
        ? await Promise?.all(
            loggedInUser?.following?.map((otherUsersId) => {
              return Tweet?.find({ userId: otherUsersId });
            })
          )
        : [];
    return res.status(200).json({
      tweets: [...loggedInUserTweets, ...followingUserTweet.flat()],
      message: 'All tweets',
      success: true,
    });
    // return res.status(200).json({
    //   tweets: loggedInUserTweets.concat(...followingUserTweet),
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server Error',
      success: false,
    });
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req?.params?.id;
    const loginUser = await User?.findById(id);
    const followingUserTweet =
      loginUser?.following?.length > 0
        ? await Promise?.all(
            loginUser?.following?.map((otherUsersId) => {
              return Tweet?.find({ userId: otherUsersId });
            })
          )
        : [];

    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
      message: 'following tweets',
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
