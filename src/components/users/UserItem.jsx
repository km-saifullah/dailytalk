import React from "react";
import Image from "../../utils/Image";
import img from "../../assets/images/john.png";

const UserItem = ({ status }) => {
  return (
    <div className="flex items-center  gap-[11px] pt-[25px]">
      <div className="w-[40px] h-[40px] overflow-hidden">
        <Image
          className="h-full w-full object-cover"
          imgSrc={img}
          altText="user image misiing"
        />
      </div>
      <div>
        <h5 className="text-primary text-[16px] font-bold font-nunito leading-[140%] capitalize">
          John Doe
        </h5>
        <p className="text-textColor text-[14px] font-normal font-roboto leading-[120%] capitalize">
          {status}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
