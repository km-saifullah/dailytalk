import React, { StrictMode, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import Image from "../../utils/Image";
import FriendsChart from "../../utils/FriendsChart";

const Settings = () => {
  const data = useSelector((state) => state.loginuserdata.value);
  let createdAt = data.createdAt;
  let date = new Date(parseInt(createdAt));
  let userCreatedAt = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const [isOpen, setIsOpen] = useState(false);

  // sidebar open close functionality
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
            <div className="w-[68px] h-[68px] rounded-full bg-textColor flex items-center justify-center">
              <figure className="">
                <Link to="/settings">
                  {/* <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                    {data && data.displayName[0]}
                  </h1> */}
                  <Image
                    imgSrc={data && data.photoURL}
                    altText="Porfile Image"
                  />
                </Link>
              </figure>
            </div>
            <h4 className="text-base font-bold font-lato leading-[140%] text-primary">
              {data && data.displayName}
            </h4>
          </div>
        </header>
        <div className="">
          <div className="">
            <h2 className="font-bold text-[25px] font-robotoFlex leading-[140%] text-primary pb-[10px]">
              User Information
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  Display Name:{" "}
                  <span className="font-nunito font-normal text-base">
                    {data && data.displayName}
                  </span>
                </h3>
              </div>
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  Job:{" "}
                  <span className="font-nunito font-normal text-base">
                    MERN Developer
                  </span>
                </h3>
              </div>
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  Email:{" "}
                  <span className="font-nunito font-normal text-base">
                    {data && data.email}
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-[10px]">
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  About:{" "}
                  <span className="font-nunito font-normal text-base">
                    Available
                  </span>
                </h3>
              </div>
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  Mobile:{" "}
                  <span className="font-nunito font-normal text-base">
                    01111111111
                  </span>
                </h3>
              </div>
              <div>
                <h3 className="font-robotoFlex text-[18px] font-semibold leading-[140%] text-primary">
                  Createde At:{" "}
                  <span className="font-nunito font-normal text-base">
                    {userCreatedAt}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className="pt-[10px]">
            <h2 className="font-bold text-[25px] font-robotoFlex leading-[140%] text-primary pb-[10px]">
              Profile Stats
            </h2>
            <div className="flex items-center justify-between">
              <div className="w-[400px] h-[200px] bg-statBg px-[10px] py-[12px]">
                <h5 className="text-textColor font-normal text-[14px] font-roboto leading-[120%]">
                  Total Friends
                  <FriendsChart />
                </h5>
                <div className="pt-2"></div>
              </div>
              <div className="w-[400px] h-[150px] bg-statBg px-[10px] py-[12px]">
                <h5 className="text-textColor font-normal text-[14px] font-roboto leading-[120%]">
                  Message Received
                </h5>
                <h2 className="font-roboto font-normal text-[50px] leading-[120%] text-primary text-center">
                  200
                </h2>
              </div>
              <div className="w-[400px] h-[150px] bg-statBg px-[10px] py-[12px]">
                <h5 className="text-textColor font-normal text-[14px] font-roboto leading-[120%]">
                  Message Sent
                </h5>
                <h2 className="font-roboto font-normal text-[50px] leading-[120%] text-primary text-center">
                  200
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end gap-x-[20px] pt-[10px]">
            <button className="bg-primary text-white font-bold font-roboto text-[20px] leading-[140%] px-[15px] py-2">
              Update Profile
            </button>
            <button className="bg-[#FF2400] text-white font-bold font-roboto text-[20px] leading-[140%] px-[15px] py-2">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
