import React from 'react';
import CreateTweet from './CreateTweet';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  console.log('tweets',tweets)
  return (
    <div className="w-[100%] mx-auto border border-gray-200">
      <div className="">
        <CreateTweet />
        {tweets?.map((tweet) => {
          return <Tweet key={tweet?._id} tweet={tweet}/>;
        })}
      </div>
    </div>
  );
};

export default Feed;
