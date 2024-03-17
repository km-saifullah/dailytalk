import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onValue, push, ref, set } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { activeUser } from "../../features/activeUser/activeUserSlice";
import { ToastContainer, toast } from "react-toastify";
import { Sidebar } from "../../components";
import { Image } from "../../utils";

const Messages = () => {
  const [friendList, setFriendList] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.loginuserdata.value);
  const activeChat = useSelector((state) => state.activeuserdata.value);
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  // handle sidebar
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
  const handleSelectedChat = (selectedFriend) => {
    dispatch(activeUser(selectedFriend));
  };

  // handle message input
  const handleMessageInput = (e) => {
    setMessageText(e.target.value);
  };

  // handle send message
  const handleSendMessgae = () => {
    if (messageText == "") {
      toast.warn("Please Write Something!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      set(push(ref(db, "message")), {
        senderId: data.uid,
        senderEmail: data.email,
        senderName: data.displayName,
        message: messageText,
        senderPhoto: data.photoURL,
        receiverId:
          data.uid == activeChat.receiverId
            ? activeChat.senderId
            : activeChat.receiverId,
        receiverName:
          data.uid == activeChat.receiverId
            ? activeChat.senderName
            : activeChat.receiverName,
        receiverEmail:
          data.uid == activeChat.receiverId
            ? activeChat.senderEmail
            : activeChat.receiverEmail,
        receiverPhoto:
          data.uid == activeChat.receiverId
            ? activeChat.senderImg
            : activeChat.receiverImg,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMessageText("");
      });
    }
  };

  // fetch message form db
  useEffect(() => {
    const messageRef = ref(db, "message");
    onValue(messageRef, (snapshot) => {
      let messageArr = [];
      let activeUserId =
        activeChat.senderId == data.uid
          ? activeChat.receiverId
          : activeChat.senderId;
      snapshot.forEach((message) => {
        if (
          (message.val().senderId == data.uid &&
            message.val().receiverId == activeUserId) ||
          (message.val().receiverId == data.uid &&
            message.val().senderId == activeUserId)
        ) {
          messageArr.push({ ...message.val(), id: message.id });
        }
      });
      setAllMessage(messageArr);
    });
  }, [activeChat]);

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
        <div className="lg:w-full h-[580px] flex gap-5">
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
                  onClick={() => handleSelectedChat(friend)}
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
                      <h5 className="text-primary text-xl font-bold font-roboto leading-[140%] capitalize">
                        {friend.receiverName}
                      </h5>
                    ) : (
                      <h5 className="text-primary text-xl font-bold font-roboto leading-[140%] capitalize">
                        {friend.senderName}
                      </h5>
                    )}
                    <p className="text-textColor text-[14px] font-normal font-robotoFlex leading-[120%]">
                      Active
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Friends Available to Chat</h1>
            )}
          </div>
          {activeChat != null ? (
            <div className="w-[70%] bg-[#2222220d] rounded-t-xl">
              <div className="bg-primary h-[15%] rounded-t-xl">
                <div className="p-4 space-y-2">
                  <h3 className="text-white text-xl font-roboto">
                    {activeChat !== null && activeChat.senderId == data.uid
                      ? activeChat.receiverName
                      : activeChat.senderName}
                  </h3>
                  <p className="text-white text-sm font-normal font-robotoFlex">
                    Active Now
                  </p>
                </div>
              </div>
              <div className="p-5 space-y-4 h-[75%] overflow-scroll no-scrollbar">
                {allMessage.map((allMessage, index) => (
                  <div key={index}>
                    {allMessage.receiverId == data.uid ? (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src={
                                allMessage.receiverId != data.uid
                                  ? allMessage.receiverPhoto
                                  : allMessage.senderPhoto
                              }
                            />
                          </div>
                        </div>
                        <div className="chat-header font-roboto">
                          {allMessage.senderName}
                          <time className="text-xs opacity-50">
                            <span className="ml-1">{allMessage.time}</span>
                          </time>
                        </div>
                        <div className="chat-bubble bg-[#222222b3] font-nunito">
                          {allMessage.message}
                        </div>
                      </div>
                    ) : (
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src={
                                allMessage.receiverId != data.uid
                                  ? allMessage.senderPhoto
                                  : allMessage.receiverPhoto
                              }
                            />
                          </div>
                        </div>
                        <div className="chat-header font-roboto">
                          {allMessage.senderName}
                          <time className="text-xs opacity-50">
                            <span className="ml-1">{allMessage.time}</span>
                          </time>
                        </div>
                        <div className="chat-bubble bg-primary font-nunito">
                          {allMessage.message}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between h-[10%] px-4 bg-primary border border-primary rounded-2xl">
                <div className="w-[90%]">
                  <input
                    type="text"
                    placeholder="Enter Your Message"
                    className="w-full px-5 py-2 rounded-3xl bg-transparent outline-none border-none text-white font-normal font-nunito"
                    onChange={handleMessageInput}
                    value={messageText}
                  />
                </div>
                <div className="h-[50px] w-[50px] hover:bg-[#ffffff4d] transition-all ease-linear duration-300 flex items-center justify-center rounded-full">
                  <button
                    className="text-3xl text-white font-bold"
                    onClick={handleSendMessgae}
                  >
                    <AiOutlineSend className="h-[26px] w-[26px]" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Messages;
