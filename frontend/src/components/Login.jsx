import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUser } from '@/redux/userSlice';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      try {
        setLoding(true);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
          input,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(getUser(res.data.user));
          navigate('/');
          toast.success(res.data.message);
          setInput({
            email: '',
            password: '',
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoding(false);
      }
    } else {
      // signup
      try {
        setLoding(true);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
          input,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
          setInput({
            name: '',
            username: '',
            email: '',
            password: '',
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoding(false);
      }
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate('/home');
  //   }
  // }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="md:flex items-center justify-evenly w-[80%]">
        <div>
          <img src={Logo} alt="twitter logo" className="w-20 md:w-[250px] mx-20 md:mx-auto" />
        </div>
        <div className="">
          <div className="my-5">
            <h1 className="font-bold text-3xl md:text-5xl">Happening now</h1>
          </div>
          <h1 className="font-bold text-xl font-serif text-gray-700 my-4">
            {isLogin ? 'Login' : 'Singup'}
          </h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-2 font-bold"
          >
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter Your Name"
                  className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
                />
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={changeEventHandler}
                  placeholder="Enter Your Username"
                  className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter Your Email"
              className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
              className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
            />
            <button className="px-4 py-2 border-none text-md bg-blue-500 hover:bg-blue-400 rounded-full font-bold w-full text-white">
              {loading ? (
                <div className="flex gap-2 items-center justify-center">
                  <Loader2 className="mr-2 animate-spin" /> Please Wait
                </div>
              ) : (
                <>{isLogin ? 'Login' : 'Singup'}</>
              )}
            </button>
            <h1 className="">
              {isLogin ? 'Do not have an account?' : 'Already have an account?'}
              <span
                className="text-blue-600 hover:underline mx-1 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Singup' : 'Login'}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
