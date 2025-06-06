import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Image } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '@/redux/tweetSlice';

const CreateTweet = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('id', user?._id);
      if (image) {
        formData.append('image', image);
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweet/createtweet`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    setImage(null);
    setPreview(null);
  };

  const activeYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const activeFollowingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div className="">
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <button
            onClick={activeYouHandler}
            className={`${
              isActive
                ? 'border-b-4 border-b-blue-600 text-right'
                : 'border-b-4'
            }cursor-pointer hover:bg-gray-800 w-full text-center p-2 rounded-sm`}
          >
            <h1 className="font-bold text-gray-600 text-xl">For You</h1>
          </button>
          <button
            onClick={activeFollowingHandler}
            className={`${
              !isActive
                ? 'border-b-4 border-b-blue-600 text-right'
                : 'border-b-4'
            }cursor-pointer hover:bg-gray-800 w-full text-center p-2 rounded-sm`}
          >
            <h1 className="font-bold text-gray-600 text-xl">Following</h1>
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center p-4">
          <div className="">
            <Avatar
              src={
                user?.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s'
              }
              size="50"
              round={true}
            />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is happening?!"
            className="w-full outline-none border-none text-xl ml-2 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-black"
          />
        </div>
        {preview && (
          <div className="p-4">
            <img src={preview} alt="Preview" className="w-full rounded-lg" />
          </div>
        )}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <label htmlFor="imageUpload" className="cursor-pointer">
              <Image size={'25px'} />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <button
            onClick={submitHandler}
            className="px-4 bg-gray-900 hover:bg-gray-800 font-bold text-white py-2 border-none rounded-full text-right text-lg"
          >
            Tweet
          </button>
          <button
            className={`flex items-center justify-center cursor-pointer bg-gradient-to-r from-red-400 via-gray-400
               to-green-400 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max
          `}
          >
            <Image className={'w-7'} src={''} alt="" />
            <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
              New chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
            </div>
            <p className="text-white text font-medium">New chat</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
