import React from 'react';
import Logo from '../assets/logo.png';
import {
  BellRing,
  CircleFadingPlus,
  Drama,
  Frown,
  Grid3x3,
  Home,
  House,
  MessageSquareMore,
  PlusSquare,
} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Bell } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { BookHeart } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Telescope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getOtherUsers, getProfile, getUser } from '@/redux/userSlice';
import Avatar from 'react-avatar';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getProfile(null));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="md:relative md:block md:w-[40%] mx-auto">
        <div>
          <img
            src={Logo}
            alt="twitter logo"
            className="flex items-center justify-center w-[30px] mt-2 md:hidden w-full "
          />
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 flex md:py-4 md:flex-col shadow-lg md:shadow-sm shadow-gray-400 md:shadow-sm px-2 fixed left-0 md:relative bottom-0 gap-1 border-b border-gray-300 w-full md:top-0 md:max-w-80 md:h-screen">
            <div className="flex items-center space-x-2 hidden md:block">
              <img src={Logo} alt="Logo" className="w-10" />
              <div className="text-xl text-gray-500 font-bold font-serif">
                TweetX
              </div>
            </div>

            <button
              onClick={() => navigate(`/`)}
              className="flex items-center my-2 hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full"
            >
              <Home className="text-xl" />
              <span className="hidden md:block">Home</span>
            </button>
            <button
              onClick={() => navigate(`/`)}
              className="flex items-center my-2 hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full"
            >
              <BellRing className="text-xl" />
              <span className="hidden md:block">Notifications</span>
            </button>
            <button
              onClick={() => navigate(`/`)}
              className="flex items-center my-2 hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full"
            >
              <Drama className="text-xl" />
              <span className="hidden md:block">Favorite</span>
            </button>
            <button
              onClick={() => navigate(`/profile/${user?._id}`)}
              className="flex items-center my-2 hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full"
            >
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
                size="25"
                round={true}
              />{' '}
              <span className="hidden md:block">Profile</span>
            </button>
            <button
              onClick={logoutHandler}
              className="flex items-center my-2 hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full md:bg-gray-900 md:hover:bg-gray-800 "
            >
              <Frown className="text-xl" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
        {/* Mobile */}
      </div>



      <div className="hidden flex shadow-lg shadow-gray-800 px-4 py-1 fixed bottom-0 gap-8 border-b border-gray-300 w-full h-[6%] bg-white md:max-w-60 md:h-full md:top-0 md:flex-col">
        <h1 className="font-bold text-blue-600 hidden md:block">FaceZone</h1>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Home
            onClick={() => button}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Home</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4">
          <MessageSquareMore
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Messages</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4">
          <BellRing
            onClick={() => setIconOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          />
          <h1 className="relative bottom-7 left-3 text-xs bg-blue-600 rounded-full w-fit h-4 text-white font-semibold px-1">
            5
          </h1>
          {/* {likeNotification?.length > 0 && <>{likeNotification?.length}</>} */}
          <span className="hidden md:block">Notifications</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <PlusSquare
            onClick={() => setIconOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Create</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Drama
            onClick={() => navigate('/network')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">NetWork</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Frown
            onClick={() => logoutHandler()}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Logout</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <div>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
              size="25"
              round={true}
            />
          </div>
          <span className="hidden md:block">Profile</span>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
