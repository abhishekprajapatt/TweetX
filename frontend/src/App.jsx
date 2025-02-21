import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Feed from './components/Feed';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoutes>
              <Feed />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/profile/:id',
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <ProtectedRoutes>
          <Login />
        </ProtectedRoutes>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
