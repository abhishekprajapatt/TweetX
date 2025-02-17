import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { ThumbsUp } from 'lucide-react';
import { MessageSquareMore } from 'lucide-react';
import { BookMarked } from 'lucide-react';
const Tweet = ({tweet}) => {
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s"
            size="50"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-2">{`@${tweet?.userDetails[0]?.username}. 1m`}</p>
            </div>
            <div className="">
              <p className="">{tweet?.description}</p>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer p-2 hover:bg-blue-200 rounded-full">
                  <ThumbsUp size={'25px'} />
                </div>
                <p className="">{tweet?.like?.length}</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer p-2 hover:bg-blue-200 rounded-full">
                  <MessageSquareMore size={'25px'} />
                </div>
                <p className="">{tweet?.comment?.length}</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="cursor-pointer p-2 hover:bg-blue-200 rounded-full">
                  <BookMarked size={'25px'} />
                </div>
                <p className="">{tweet?.bookmarks?.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
