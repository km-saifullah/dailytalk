import React from "react";
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { TbSettings } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full">
      <div className="container mx-auto">
        <ul className="px-[42px] py-4 bg-navbar text-[#ffffff80] flex items-center justify-between rounded-b-[30px]">
          <li>
            <NavLink to="/home">
              <BiHome className="w-[50px] h-[50px]" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages">
              <IoChatbubbleEllipsesOutline className="w-[50px] h-[50px]" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/people">
              <FaUserFriends className="w-[50px] h-[50px]" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/notification">
              <MdNotificationsNone className="w-[50px] h-[50px]" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <TbSettings className="w-[50px] h-[50px]" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
