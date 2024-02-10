import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Image from "../../utils/Image";
import profileImg from "../../assets/images/profile.png";
import Chats from "../../components/chats/Chats";
import Users from "../../components/users/Users";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const Home = () => {
  const data = useSelector((state) => state.loginuserdata.value);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = window.location.href;

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      navigate("/home");
      if (location === "http://localhost:5173") {
        redirect("/home");
      }
    }
  }, []);

  return (
    <section className="pt-[10px]">
      <div className="container mx-auto">
        <header className="flex items-center justify-between pb-[20px] relative">
          {isOpen && <Sidebar handleSidebar={handleSidebar} />}
          <div className="text-primary cursor-pointer">
            <button onClick={handleSidebar}>
              <FaBars className="w-[28px] h-[28px]" />
            </button>
          </div>
          <div className="flex items-center justify-center flex-col gap-y-1">
            <div className="w-[68px] h-[68px] rounded-full bg-textColor flex items-center justify-center">
              <figure className="">
                {/* <Image
                  className="w-full h-full object-cover"
                  // imgSrc={data && data.photoURL}
                  altText="display image"
                /> */}
                <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                  {data.displayName[0]}
                </h1>
              </figure>
            </div>
            <h4 className="text-base font-bold font-lato leading-[140%] text-primary">
              {data && data.displayName}
            </h4>
          </div>
        </header>
        <div className="pb-[14px] flex items-center justify-center">
          <div className="w-[1500px] bg-[#0000001a] px-[34px] py-3 rounded-[20px] flex items-center gap-x-[5px]">
            <IoSearch className="text-secondary" />
            <input
              className="w-full bg-transparent outline-none border-none text-primary font-roboto font-normal text-[14px]"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-[20px]">
          <Chats />
          <Users />
        </div>
      </div>
    </section>
  );
};

export default Home;
