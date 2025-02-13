import React, { useState } from 'react';
import Logo from '../assets/logo.png';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img width={'250px'} src={Logo} alt="twitter logo" className="" />
        </div>
        <div className="">
          <div className="my-5">
            <h1 className="font-bold text-5xl">Happening now</h1>
          </div>
          <h1 className="font-bold text-xl text-gray-600 my-4">{isLogin ? 'Login' : 'Singup'}</h1>
          <form action="" className="flex flex-col gap-2 font-bold">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
                />
                <input
                  type="text"
                  pattern="[A-Za-z0-9]{4,20}"
                  placeholder="Enter Your Username"
                  className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Enter Your Email"
              className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="outline-blue-600 border border-gray-600 px-4 py-2 rounded-full"
            />
            <button className="px-4 py-2 border-none text-md bg-blue-500 hover:bg-blue-400 rounded-full font-bold w-full text-white">
              {isLogin ? 'Login' : 'Singup'}
            </button>
            <h1 className="">
              {isLogin ? 'Do not have an account?' : 'Already have an account?'}
              <span className="text-blue-600 hover:underline mx-1 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
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
