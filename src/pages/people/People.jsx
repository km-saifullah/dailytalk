import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../db/firebaseConfig";
import { onValue, push, ref, remove, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { FaBars } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Sidebar } from "../../components";
import { Image } from "../../utils";

const People = () => {
  const [friendList, setFriendList] = useState();
  const data = useSelector((state) => state.loginuserdata.value);
  const [isOpen, setIsOpen] = useState(false);

  // sidebar open close functionality
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

  // user block functionality
  const handleUserBlock = (blockInfo) => {
    set(push(ref(db, "blockList")), {
      blockedName: blockInfo.senderName,
      blockedId: blockInfo.senderId,
      blockedEmail: blockInfo.senderEmail,
      blockedImg: blockInfo.senderImg,
      whoBlockId: data.uid,
      whoBlockEmail: data.email,
      whoBlockName: data.displayName,
      whoBlockImg: data.photoURL,
    }).then(() => {
      remove(ref(db, "friends/" + blockInfo.id));
      toast.success("User Has Been Blocked", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  return (
    <section className="pt-[10px]">
      <div className="container mx-auto">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
                <Image
                  className="w-full h-full object-cover"
                  imgSrc={data && data.photoURL}
                  altText="display image"
                />
                {/* <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
              {data && data.displayName[0]}
            </h1> */}
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
        <section className="bg-[#2222220d] w-[100%] h-[650px] pl-[44px] py-[10px] pr-[14px] rounded-t-[20px] overflow-scroll no-scrollbar">
          <div className="flex items-center justify-between">
            <h1 className="text-primary font-semibold font-robotoFlex text-[35px] leading-[140%]">
              Firend List
            </h1>
            <div>
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="">
            {friendList && friendList.length > 0 ? (
              friendList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between flex-wrap py-[15px]"
                >
                  <div className="userimgbox">
                    <img
                      src={
                        data.uid == item.senderId
                          ? item.receiverImg
                          : item.senderImg
                      }
                      alt="img"
                      style={{ height: "65px", width: "65px" }}
                    />
                    <div>
                      {data.uid == item.senderId ? (
                        <h3 className="text-xl font-medium text-primary font-robotoFlex pt-2 capitalize">
                          {item.receiverName}
                        </h3>
                      ) : (
                        <h3 className="text-xl font-medium text-primary font-robotoFlex pt-2 capitalize">
                          {item.senderName}
                        </h3>
                      )}
                      <p>MERN Developer</p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleUserBlock(item)}
                      className="bg-red-500 hover:bg-red-700 w-[100px] h-[40px] text-white rounded font-roboto"
                    >
                      Block
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>No Friends yet</h2>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default People;
