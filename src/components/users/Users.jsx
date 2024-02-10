import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserItem from "./UserItem";

const Chats = () => {
  return (
    <section className="bg-[#2222220d] w-[50%] h-[580px] pl-[44px] py-[10px] pr-[14px] rounded-t-[20px] overflow-scroll no-scrollbar">
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-semibold font-robotoFlex text-[35px] leading-[140%]">
          Users
        </h1>
        <div>
          <BsThreeDotsVertical />
        </div>
      </div>
      <UserItem status="active" />
    </section>
  );
};

export default Chats;
