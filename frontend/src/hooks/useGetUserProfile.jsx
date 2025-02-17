import { getProfile } from '@/redux/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
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
        if (res?.data?.success) {
          dispatch(getProfile(res?.data?.user));
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
    if (id) {
      fetchUserProfile();
    }
  }, [id, dispatch]);
};

export default useGetUserProfile;
