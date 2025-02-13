import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <div className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <ArrowLeft onClick={() => navigate('/')} />
          </div>
          <div className="ml-2">
            <h className="font-bold text-lg">Striver</h>
            <p className="text-gray-500 text-sm">20 poxts</p>
          </div>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
          alt="banner"
          className="w-full h-[14rem]"
        />
        <div className="relative -top-20 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
            size="150"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          <button className="px-4 py-1 rounded-full border border-gray-400">
            Edit Profile
          </button>
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">Striver</h1>
          <p className="">striver532006@gmail.com</p>
        </div>
        <div className="m-4 text-sm">
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, soluta!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
