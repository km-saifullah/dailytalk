import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Image from "../../utils/Image";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { AiOutlineSend } from "react-icons/ai";

const Messages = () => {
  const [friendList, setFriendList] = useState();
  const data = useSelector((state) => state.loginuserdata.value);

  const [isOpen, setIsOpen] = useState(false);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // fetch friend list data from db
  useEffect(() => {
    const friendRef = ref(db, "friends");
    onValue(friendRef, (snapshot) => {
      let friendsArr = [];
      snapshot.forEach((friend) => {
        if (
          data.uid == friend.val().receiverId ||
          data.uid == friend.val().senderId
        ) {
          friendsArr.push({ ...friend.val(), id: friend.key });
        }
      });
      setFriendList(friendsArr);
    });
  }, []);

  // handle message
  const handleMessage = (friend) => {};

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
                <Link>
                  <Image
                    className="w-full h-full object-cover"
                    imgSrc={data && data.photoURL}
                    altText="display image"
                  />
                </Link>
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
        <div className="w-full h-[580px] flex gap-5">
          <div className="w-[30%] bg-[#2222220d] px-4 rounded-t-xl ">
            <div className="mt-5">
              <h2 className="text-primary font-semibold font-robotoFlex text-[35px] leading-[140%]">
                Message List
              </h2>
            </div>
            {friendList && friendList.length > 0 ? (
              friendList.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center  gap-[11px] p-2 cursor-pointer hover:bg-secondary hover:text-white hover:rounded mt-5"
                  onClick={() => handleMessage(friend)}
                >
                  <div className="w-[68px] h-[68px] overflow-hidden">
                    <Image
                      className="h-full w-full object-cover"
                      imgSrc={
                        data.uid == friend.senderId
                          ? friend.receiverImg
                          : friend.senderImg
                      }
                      altText="user image misiing"
                    />
                  </div>
                  <div>
                    {data.uid == friend.senderId ? (
                      <h5 className="text-primary text-xl font-bold font-nunito leading-[140%] capitalize">
                        {friend.receiverName}
                      </h5>
                    ) : (
                      <h5 className="text-primary text-xl font-bold font-nunito leading-[140%] capitalize">
                        {friend.senderName}
                      </h5>
                    )}
                    <p className="text-textColor text-[14px] font-normal font-roboto leading-[120%]">
                      Active
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Friends Available to Chat</h1>
            )}
          </div>
          <div className="w-[70%] bg-[#2222220d] rounded-t-xl">
            <div className="bg-primary h-[15%] rounded-t-xl">
              <div className="p-4 space-y-2">
                <h3 className="text-white text-xl font-roboto">Hello Name</h3>
                <p className="text-white text-sm font-normal font-robotoFlex">
                  Active Now
                </p>
              </div>
            </div>
            <div className="p-5 space-y-4 h-[75%] overflow-scroll no-scrollbar">
              <div className="">
                <p className="bg-[#222222b3] text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  Hello I am from the Earth🌏
                </p>
              </div>
              <div className="flex items-end justify-end">
                <p className=" bg-primary text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  Hi I am from the Universe
                </p>
              </div>
              <div className="">
                <p className="bg-[#222222b3] text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  What are you doing in the Universe?
                </p>
              </div>
              <div className="flex items-end justify-end">
                <p className=" bg-primary text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  I am talking with the stars⭐️ and moons. What about you?
                </p>
              </div>
              <div className="">
                <p className="bg-[#222222b3] text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  I am messing around with the monkeys🐒🐒🐒🐒
                </p>
              </div>
              <div className="flex items-end justify-end">
                <p className=" bg-primary text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  hahahahahaha🤣🤣🤣
                </p>
              </div>
              <div className="">
                <p className="bg-[#222222b3] text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  👊👊👊👊👊👊
                </p>
              </div>
              <div className="flex items-end justify-end">
                <p className=" bg-primary text-white p-3 rounded-2xl w-[40%] inline-block font-nunito text-base font-medium">
                  🤠🤠🤠
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between h-[10%] px-4 bg-primary border border-primary rounded-2xl">
              <div className="w-[90%]">
                <input
                  type="text"
                  placeholder="Enter Your Message"
                  className="w-full px-5 py-2 rounded-3xl bg-transparent outline-none border-none text-white font-normal font-nunito"
                />
              </div>
              <div className="h-[40px] w-[40px] hover:bg-[#ffffff4d] flex items-center justify-center rounded-full">
                <button className="text-3xl text-white font-bold">
                  <AiOutlineSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
