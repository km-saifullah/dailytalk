import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Image from "../../utils/Image";
import profileImg from "../../assets/images/profile.png";
import Chats from "../../components/chats/Chats";
import Users from "../../components/users/Users";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };
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
            <div className="w-[68px] h-[68px] rounded-full bg-textColor">
              <figure>
                <Image
                  className="w-full h-full object-cover"
                  imgSrc={profileImg}
                  altText="display image"
                />
              </figure>
            </div>
            <h4>Khaled Saifullah</h4>
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
