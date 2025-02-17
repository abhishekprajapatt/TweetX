import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Outlet } from 'react-router-dom';
import useOtherUsers from '@/hooks/useOtherUsers';
import { useSelector } from 'react-redux';
import useGetUserTweets from '@/hooks/useGetUserTweets';

const Home = () => {
  const { user } = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  useGetUserTweets(user?._id);
  return (
    <div className="flex gap-4 justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Outlet/>
      <RightSidebar />
    </div>
  );
};

export default Home;
