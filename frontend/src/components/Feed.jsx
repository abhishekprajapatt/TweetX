import React from 'react';
import CreateTweet from './CreateTweet';
import Tweet from './Tweet';

const Feed = () => {
  return (
    <div className="w-[60%] mx-auto border border-gray-200">
      <div className="">
        <CreateTweet />
        <Tweet />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Feed;
