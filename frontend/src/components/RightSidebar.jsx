import React from 'react';
import Avatar from 'react-avatar';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
  const { otherUsers } = useSelector((store) => store?.user || {});
  const navigate = useNavigate();
  if(!otherUsers) return <h1>Loading...!</h1>
  console.log(otherUsers)
  return (
    <div className="hidden md:block w-[50%] mx-auto mt-4">
      <div className="flex items-center p-2 text-gray-600 bg-gray-900 rounded-full outline-none w-full">
        <Search size="20px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="my-4 p-4 bg-slate-900 rounded-2xl">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {otherUsers.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex items-center justify-between my-2"
            >
              <div className="flex">
                <div>
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
                    size="50"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <button onClick={() => navigate(`/profile/${user?._id}`)} className="px-6 ml-[-4rem] py-2 mb-4 bg-black text-sm rounded-full">
                Profile
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
