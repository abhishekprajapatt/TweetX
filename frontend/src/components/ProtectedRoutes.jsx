import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if(user) {
      navigate('/')
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoutes;
