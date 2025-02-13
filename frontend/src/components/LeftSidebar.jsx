import React from 'react';
import { House } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Bell } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { BookHeart } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Telescope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const profileId = "aapkijikiid"
  return (
    <div className="w-[20%] mx-auto">
      <div className="">
        <div>
          <FaXTwitter width={'24px'} />
        </div>
        <div className="my-4">
          <button onClick={() => navigate(`/`)} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <House className="text-xl" /> Home
          </button>
          <button onClick={() => navigate(`/`)} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <Telescope className="text-xl" /> Explore
          </button>
          <button onClick={() => navigate(`/`)} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <Bell className="text-xl" /> Notifications
          </button>
          <button onClick={() => navigate(`/profile/${profileId}`)} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <CircleUser  className="text-xl" /> Profile
          </button>
          <button onClick={() => navigate(`/`)} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <BookHeart className="text-xl" /> Favorite
          </button>
          <button className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer gap-2 font-bold text-xl w-full">
            <LogOut onClick={() => navigate(`/`)} className="text-xl" /> Logout
          </button>
          <button className="px-4 py-2 border-none text-md bg-blue-500 hover:bg-blue-400 rounded-full font-bold w-full text-white">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
