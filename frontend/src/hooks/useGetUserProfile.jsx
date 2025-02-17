import { getProfile } from '@/redux/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetUserProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        dispatch(getProfile(res.data.user));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    if (id) {
      fetchUserProfile();
    }
  }, [id, dispatch]); 
};

export default useGetUserProfile;
