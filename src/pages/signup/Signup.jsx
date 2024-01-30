import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="h-[100vh] flex items-center justify-center flex-col">
          <div>
            <h2 className="text-primary font-robotoFlex text-[35px] leading-[140%] font-semibold text-center">
              Register Yourself
            </h2>
            <p className="w-[495px] mx-auto pt-2 pb-6 text-textColor text-[14px] font-roboto font-normal leading-[120%] text-center">
              Welcome to DailyTalk where every conversation becomes a cherished
              moment. Empowering seamless and meaningful connections in your
              daily life
            </p>
          </div>
          <div className="flex items-center flex-col">
            <form className="pb-6">
              <div className="flex items-center justify-center gap-[20px] flex-col">
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Enter Your Name"
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Enter a Username"
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Enter Your Email"
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Enter Password"
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex items-center gap-x-[8px] py-[20px]">
                <input
                  className="w-[20px] h-[20px] cursor-pointer accent-primary"
                  type="checkbox"
                  name=""
                  id=""
                />
                <label
                  htmlFor=""
                  className="text-primary text-4 font-roboto font-normal leading-[120%]"
                >
                  I agree to the terms and conditions
                </label>
              </div>
              <div>
                <button className="w-[660px] py-[9px] pl-[33px] bg-primary outline-none border-none rounded-[20px] text-4 font-bold font-nunito text-white hover:bg-[#0000001a] hover:text-primary transition-all duration-300 ease-linear">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-[16px] text-primary leading-[120%]">
              Already have an account?{" "}
              <Link to="/" className="text-textColor font-normal font-roboto">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
