import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { colors } from "../../utils/Colors";
import { BsThreeDotsVertical } from "react-icons/bs";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { Hourglass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const FriendRequest = () => {
  const data = useSelector((state) => state.loginuserdata.value);
  const [isOpen, setIsOpen] = useState(false);
  const [friendRequest, setFriendRequest] = useState();

  // sidebar open close functionality
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // fetch request data
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let requestArr = [];
      snapshot.forEach((request) => {
        if (data.uid == request.val().receiverId) {
          requestArr.push({ ...request.val(), id: request.key });
        }
      });
      setFriendRequest(requestArr);
    });
  }, []);

  // handle cancel friend request
  const handleCancelRequest = (cancelRequest) => {
    remove(ref(db, "friendRequest/" + cancelRequest.id)).then(() => {
      toast.info("Cancel Request", {
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
                {/* <Image
              className="w-full h-full object-cover"
              // imgSrc={data && data.photoURL}
              altText="display image"
            /> */}
                <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                  {data && data.displayName[0]}
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
        <section className="bg-[#2222220d] w-[100%] h-[650px] pl-[44px] py-[10px] pr-[14px] rounded-t-[20px] overflow-scroll no-scrollbar">
          <div className="flex items-center justify-between">
            <h1 className="text-primary font-semibold font-robotoFlex text-[35px] leading-[140%]">
              Friend Requests
            </h1>
            <div>
              <BsThreeDotsVertical />
            </div>
          </div>
          <div>
            {friendRequest && friendRequest.length > 0 ? (
              friendRequest.map((fRequest, index) => (
                <div key={index} className="pt-[20px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-[25px]">
                      <div
                        className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${
                            colors[Math.floor(Math.random() * 10)]
                          }`,
                        }}
                      >
                        <figure>
                          <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                            {fRequest.senderName[0]}
                          </h1>
                        </figure>
                      </div>
                      <div>
                        <h3 className="text-primary text-[20px] font-bold font-nunito leading-[140%] capitalize">
                          {fRequest.senderName}
                        </h3>
                        <p className="text-textColor text-[14px] font-normal font-roboto leading-[120%] capitalize">
                          Developer
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-[10px]">
                      <button className="bg-primary hover:bg-secondary text-white px-[8px] py-[5px] rounded-[8px]">
                        Accept
                      </button>
                      <button
                        className="bg-primary hover:bg-secondary text-white px-[8px] py-[5px] rounded-[8px]"
                        onClick={() => handleCancelRequest(fRequest)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[50vh] w-full flex items-center justify-center">
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
        </section>
      </div>
    </section>
  );
};

export default FriendRequest;
