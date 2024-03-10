import React, { useEffect, useState } from "react";
import Image from "../../utils/Image";
import { useSelector } from "react-redux";
import { onValue, push, ref, remove, set } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { Hourglass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const UserItem = ({ status }) => {
  const data = useSelector((state) => state.loginuserdata.value);
  const [userList, setUserList] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  // fetch block list data
  useEffect(() => {
    const blockListRef = ref(db, "blockList");
    onValue(blockListRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((blockList) => {
        if (data.uid == blockList.val().whoBlockId) {
          blockArr.push({ ...blockList.val(), id: blockList.key });
        }
      });
      setBlockList(blockArr);
    });
  }, []);
  console.log(blockList);
  console.log(userList);

  // fetch all users data from the db
  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let userArr = [];
      snapshot.forEach((user) => {
        if (data.uid != user.key) {
          userArr.push({ ...user.val(), id: user.key });
        }
      });
      setUserList(userArr);
    });
  }, []);

  // handle friend request
  const handleFriendRequest = (friendRequest) => {
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      senderName: data.displayName,
      senderImg: data.photoURL,
      senderEmail: data.email,
      receiverId: friendRequest.id,
      receiverName: friendRequest.fullname,
      receiverEmail: friendRequest.email,
      receiverImg: friendRequest.displayImage,
      receiverUsername: friendRequest.username,
    }).then(() => {
      toast.success("Friend Request Sent", {
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

  // fetch friend request data from db
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let requestArr = [];
      snapshot.forEach((request) => {
        if (request.val().senderId == data.uid) {
          requestArr.push(request.val().receiverId + request.val().senderId);
        }
      });
      setFriendRequest(requestArr);
    });
  }, []);

  // fetch friend list data from db
  useEffect(() => {
    const friendRef = ref(db, "friends");
    onValue(friendRef, (snapshot) => {
      let friendsArr = [];
      snapshot.forEach((friend) => {
        if (
          friend.val().receiverId == data.uid ||
          friend.val().senderId == data.uid
        ) {
          friendsArr.push(friend.val().receiverId + friend.val().senderId);
        }
      });
      setFriendList(friendsArr);
    });
  }, []);

  // cancel friend request
  const handleCancelFriendReq = (cancelInfo) => {
    console.log(cancelInfo);
    // remove(ref(db, "friendRequest/" + cancelInfo.id)).then(() => {
    //   toast.success("Cancel Request", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // });
  };

  return (
    <div className="flex flex-col flex-wrap  gap-[20px] pt-[25px]">
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
      {userList && userList.length > 0 ? (
        userList.map((user, index) => (
          <div key={index} className="flex items-center gap-[20px]">
            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center border border-solid">
              <figure>
                <Image
                  className="h-full w-full object-cover"
                  imgSrc={user.displayImage}
                  altText="user image misiing"
                />
              </figure>
            </div>
            <div className=" flex items-start w-[90%]">
              <div className="w-[80%]">
                <h5 className="text-primary text-[20px] font-bold font-nunito leading-[140%] capitalize">
                  {user.fullname}
                </h5>
                <p className="text-textColor text-[14px] font-normal font-roboto leading-[120%] capitalize">
                  {status}
                </p>
              </div>
              <div className="w-[30%]">
                {(friendRequest.length > 0 &&
                  friendRequest.includes(user.id + data.uid)) ||
                friendRequest.includes(data.uid + user.id) ? (
                  <div className="flex items-center gap-x-3">
                    <button className="w-[100px] h-[40px] text-white bg-secondary rounded cursor-auto">
                      Pending
                    </button>
                    <button
                      className="hover:bg-red-700 hover:rounded w-[100px] h-[40px] text-white bg-red-600 rounded"
                      onClick={() => handleCancelFriendReq(user)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : friendList.includes(user.id + data.uid) ||
                  friendList.includes(data.uid + user.id) ? (
                  <button className="w-[100px] h-[40px] text-white bg-green-600 rounded cursor-auto">
                    Friend
                  </button>
                ) : (
                  <button
                    className="hover:bg-secondary hover:rounded w-[100px] h-[40px] text-white bg-primary rounded"
                    onClick={() => handleFriendRequest(user)}
                    title="Add Friend"
                  >
                    {/* <IoAddCircleOutline className="h-[40px] w-[40px] text-primary hover:text-white" /> */}
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-[30vh]">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#222222", "rgba(34, 34, 34, 0.5)"]}
          />
        </div>
      )}
    </div>
  );
};

export default UserItem;
