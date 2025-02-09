import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const LeftSidebar = () => {
  return (
    <div>
        <div>
            <div>
                <FaXTwitter width={"24px"}/>
            </div>
            <div>
                <div className="bg-red">
                <IoHomeOutline className='text-bl' /> Home
                </div>
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar