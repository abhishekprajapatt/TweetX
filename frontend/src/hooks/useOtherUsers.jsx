import { getOtherUsers } from '@/redux/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
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
        dispatch(getOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchUsers();
  }, [id, dispatch]);
};

export default useOtherUsers;
