import React, { useEffect, useState } from "react";
import Image from "../../utils/Image";
import img from "../../assets/images/john.png";
import { useSelector } from "react-redux";
import { onValue, push, ref, set } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { Hourglass } from "react-loader-spinner";
import { colors } from "../../utils/Colors";
import { IoAddCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const UserItem = ({ status }) => {
  const [userList, setUserList] = useState();
  const data = useSelector((state) => state.loginuserdata.value);

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
            <div
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center border border-solid"
              // style={{
              //   backgroundColor: `${colors[Math.floor(Math.random() * 10)]}`,
              // }}
            >
              <figure>
                {/* <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                  {user.fullname[0]}
                </h1> */}
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
              <div className="w-[10%]">
                <button
                  className="hover:bg-secondary hover:rounded"
                  onClick={() => handleFriendRequest(user)}
                  title="Add Friend"
                >
                  <IoAddCircleOutline className="h-[40px] w-[40px] text-primary hover:text-white" />
                </button>
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
