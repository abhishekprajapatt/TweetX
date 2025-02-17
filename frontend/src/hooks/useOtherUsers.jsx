import { getOtherUsers } from '@/redux/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const useOtherUsers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/otherusers/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          dispatch(getOtherUsers(res?.data?.otherUsers));
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    if (id) fetchUsers();
  }, [id, dispatch]);
};

export default useOtherUsers;
