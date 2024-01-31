import React from "react";

const Error = ({ errorMsg }) => {
  return (
    <div className="w-[100%]">
      <p className="bg-red-500 text-white text-[16px] font-robotoFLex py-2 px-8 flex items-start justify-start rounded-[20px]">
        {errorMsg}
      </p>
    </div>
  );
};

export default Error;
