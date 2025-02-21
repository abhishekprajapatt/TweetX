import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import toast from 'react-hot-toast';
import { getfollowingUpdate } from '@/redux/userSlice';
import axios from 'axios';
import { getRefresh } from '@/redux/tweetSlice';
import EditProfile from './EditProfile';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const { user, profile } = useSelector((store) => store.user);
  useGetUserProfile(id);
  const followOrUnfollowHandler = async () => {
    if (user?.following?.includes(id)) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/unfollow/${id}`,
          { id: user?._id },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          dispatch(getfollowingUpdate(id));
          dispatch(getRefresh());
          toast?.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/follow/${id}`,
          { id: user?._id },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          dispatch(getfollowingUpdate(id));
          dispatch(getRefresh());
          toast?.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const EditOpen = () => {
    setEditOpen(!editOpen);
  };
  return (
    <div className="md:w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <div className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <ArrowLeft onClick={() => navigate('/')} />
          </div>
          <div className="ml-2">
            <h className="font-bold text-lg">{profile?.name || 'username'}</h>
            <p className="text-gray-500 text-sm">{'20 posts'}</p>
          </div>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
          alt="banner"
          className="w-full h-[8rem] md:h-[14rem]"
        />
        <div className="relative -top-20 ml-2 border- border-white rounded-full">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
            className=""
            round={true}
          />
        <div className="flex m-4">
          <div className="w-[20rem] mx-2">
            <div className="">
              <h1 className="font-bold text-xl">{profile?.name}</h1>
              <p className="">{`@${profile?.username}`}</p>
            </div>
            <p className="text-sm w-[20rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              soluta!
            </p>
          </div>
          <div className="text-right">
            {profile?._id === user?._id ? (
              <button
                onClick={() => EditOpen(true)}
                className="px-4 py-1 rounded-full border border-gray-400 text-xs"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followOrUnfollowHandler}
                className="px-4 py-1 rounded-full border text-white bg-gray-800 hover:bg-gray-700 border-gray-400"
              >
                {user?.following?.includes(id) ? 'following' : 'follow'}
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
      {editOpen && <EditProfile />}
    </div>
  );
};

export default Profile;
