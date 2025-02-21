import React, { useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import useOtherUsers from '@/hooks/useOtherUsers';
import { useSelector } from 'react-redux';
import useGetUserTweets from '@/hooks/useGetUserTweets';

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useOtherUsers(user?._id);
  useGetUserTweets(user?._id);
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between md:w-[90%] mx-auto">
      <LeftSidebar />
      <Outlet/>
      <RightSidebar/>
    </div>
  );
};

export default Home;
