import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ImBlocked } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../../features/user/userSlice";

const Sidebar = ({ handleSidebar }) => {
  const data = useSelector((state) => state.loginuserdata.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(loginuser(null));
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <section className="absolute top-[30px] left-0 h-[86vh] w-[200px] bg-[#000000e6] text-white rounded-t-[10px]">
      <div className="flex justify-between flex-col gap-[40px]">
        <div className="flex items-center justify-between px-[10px] py-[20px] gap-[95px] h-[10vh]">
          <div>
            <h3 className="font-bold font-roboto text-[16px]">
              <Link to="/home">DailyTalk</Link>
            </h3>
          </div>
          <div>
            <button className="font-roboto text-[26px]" onClick={handleSidebar}>
              <RxCross2 />
            </button>
          </div>
        </div>
        <ul className="px-[8px] py-[20px] flex items-start flex-col gap-[36px] h-[55vh]">
          <li>
            <div className="flex items-center gap-[15px]">
              <AiOutlineHome className="h-[30px] w-[30px]" />
              <NavLink to="/home">Home</NavLink>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-[15px]">
              <FaPeopleGroup className="h-[30px] w-[30px]" />
              <NavLink to="/friendrequest">My Groups</NavLink>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-[15px]">
              <FaUsers className="h-[30px] w-[30px]" />
              <NavLink to="/friendrequest">Friend Request</NavLink>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-[15px]">
              <GiThreeFriends className="h-[30px] w-[30px]" />
              <NavLink to="/friends">Friends</NavLink>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-[15px]">
              <ImBlocked className="h-[30px] w-[30px]" />
              <NavLink to="/blocklist">Block List</NavLink>
            </div>
          </li>
        </ul>
        <div className="px-[8px] py-[0px] h-[10vh]">
          <div className="flex items-center justify-center gap-[15px]">
            <button
              className="flex items-center gap-[10px]"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="h-[30px] w-[30px]" /> Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
