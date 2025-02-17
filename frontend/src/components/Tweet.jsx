import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { ThumbsUp } from 'lucide-react';
import { MessageSquareMore } from 'lucide-react';
import { MdDeleteForever } from 'react-icons/md';
import { BookMarked } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '@/redux/tweetSlice';
import axios from 'axios';
const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweet/like/${id}`,
        { id: user?._id },
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
  };

  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweet/delete/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
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
  };

  function timeSince(timestamp) {
    let time = Date.parse(timestamp);
    let now = Date.now();
    let secondsPast = (now - time) / 1000;
    let suffix = 'ago';

    let intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let i in intervals) {
      let interval = intervals[i];
      if (secondsPast >= interval) {
        let count = Math.floor(secondsPast / interval);
        return `${count} ${i} ${count > 1 ? 's' : ''} ${suffix}`;
      }
    }
  }
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
            size="50"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-2">{`@${
                tweet?.userDetails[0]?.username
              }. ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div className="">
              <p className="">{tweet?.description}</p>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className={`${
                    tweet?.like && 'bg-blue-300'
                  }cursor-pointer p-2 hover:bg-blue-200 rounded-full `}
                >
                  <ThumbsUp size={'25px'} />
                </div>
                <p className="">{tweet?.like?.length}</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer p-2 hover:bg-blue-200 rounded-full">
                  <MessageSquareMore size={'25px'} />
                </div>
                <p className="">{tweet?.comment?.length}</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer p-2 hover:bg-green-200 rounded-full">
                  <BookMarked size={'25px'} />
                </div>
                <p className="">{tweet?.bookmarks?.length}</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex gap-2 items-center"
                >
                  <div className="cursor-pointer p-2 hover:bg-red-200 rounded-full">
                    <MdDeleteForever size={'25px'} />
                  </div>
                  <p className="">{tweet?.bookmarks?.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
