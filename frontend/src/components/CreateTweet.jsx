import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Image } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getRefresh } from '@/redux/tweetSlice';

const CreateTweet = () => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweet/createtweet`,
        { description, id: user?._id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(getRefresh());
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setDescription('');
  };

  const followingTweetHandler = async () => {
    const id = user?._id;
    try {
      // http://localhost:8082/api/v1/tweet/followingtweets/67af78c0224515adb9308e68
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/tweet/followingtweets/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('following tweets', res);
      if(res?.data?.success){
        dispatch(getAllTweets(res.data.tweets));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-[100%]">
      <div className="">
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center p-2 rounded-sm">
            <h1 className="font-bold text-gray-600 text-xl">For You</h1>
          </div>
          <button
            onClick={followingTweetHandler}
            className="cursor-pointer hover:bg-gray-200 w-full text-center p-2 rounded-sm"
          >
            <h1 className="font-bold text-gray-600 text-xl">Following</h1>
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center p-4">
          <div className="">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
              size="50"
              round={true}
            />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is happening?!"
            className="w-full outline-none border-none text-xl ml-2"
          />
        </div>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <Image size={'25px'} />
          </div>
          <button
            onClick={submitHandler}
            className="px-4 bg-blue-500 hover:bg-blue-400 font-bold text-white py-2 border-none rounded-full text-right text-lg"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
