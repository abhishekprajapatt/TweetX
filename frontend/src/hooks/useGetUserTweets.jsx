import { getAllTweets } from '@/redux/tweetSlice';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const useGetUserTweets = (id) => {
  const dispatch = useDispatch();
  const { isActive, refresh } = useSelector((store) => store.tweet);

  const fetchUserTweets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweet/alltweets/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(getAllTweets(res?.data?.tweets));
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
      toast.error(error.response.data.message);
    }
  };

  const fetchfollowingTweets = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/tweet/followingtweets/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('following tweets', res);
      if (res?.data?.success) {
        dispatch(getAllTweets(res?.data?.tweets));
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    isActive ? fetchUserTweets() : fetchfollowingTweets();
  }, [isActive, refresh]);

  return;
};

export default useGetUserTweets;
