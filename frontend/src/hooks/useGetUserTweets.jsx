import { getAllTweets } from '@/redux/tweetSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetUserTweets = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserTweets = async () => {
      if (!id) return; 
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
        console.log('Fetched Tweets:', res.data.tweets);
        dispatch(getAllTweets(res.data.tweets));
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchUserTweets();
  }, [id, dispatch]);

  return;
};

export default useGetUserTweets;
