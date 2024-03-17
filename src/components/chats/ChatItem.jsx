import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { useSelector } from "react-redux";
import { Image } from "../../utils";

const ChatItem = () => {
  const [friendList, setFriendList] = useState();
  const data = useSelector((state) => state.loginuserdata.value);

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
    <>
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
    </>
  );
};

export default ChatItem;
