import { Tweet } from '../models/tweet.model.js';

export const CreateTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: 'Fields are required!',
        success: false,
      });
    }

    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(200).json({
      message: 'Tweet Created Successfully!',
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
      message: 'Tweet Deleted Successfully!',
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
