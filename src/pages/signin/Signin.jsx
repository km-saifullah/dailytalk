import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation } from "../../validation/Validation";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../db/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginuser } from "../../features/user/userSlice";
import { Error } from "../../utils";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    password: "",
  });

  // handle form input fields
  const handleInput = (e) => {
    const signinInfo = { ...signInData };
    signinInfo[e.target.name] = e.target.value;
    setSignInData(signinInfo);
  };

  // handle signin form
  const handleSignIn = (e) => {
    const mailError = emailValidation(signInData.email);
    setError({ ...error, emailError: mailError });
    setSignInData({
      email: "",
      password: "",
    });

    // signin functionality
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userData) => {
        if (userData.user.emailVerified) {
          localStorage.setItem("user", JSON.stringify(userData.user));
          let d = dispatch(loginuser(userData.user));
          navigate("/home");
        } else {
          signOut(auth).then(() => {
            toast.error("Please Verify your email", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
        }
      })
      .catch((err) => {});

    // signed user data
    onAuthStateChanged(auth, (currentUser) => {});
    e.preventDefault();
  };
  return (
    <section>
      <div className="container mx-auto">
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
        <div className="h-[100vh] flex items-center justify-center flex-col">
          <h1 className="text-primary font-extrabold text-6xl pb-6 font-roboto text-center">
            dailyTalk
          </h1>
          <div>
            <h2 className="text-primary font-robotoFlex text-[20px] leading-[140%] font-semibold text-center">
              Signin Yourself
            </h2>
            <p className="w-[495px] mx-auto pt-2 pb-6 text-textColor text-[14px] font-roboto font-normal leading-[120%] text-center">
              Welcome to seamless connections. Join our vibrant community with a
              single login and make every day meaningful conversations.
            </p>
          </div>
          <div className="flex items-center flex-col">
            <form className="pb-6">
              <div className="flex items-center justify-center gap-[20px] flex-col">
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={signInData.email}
                  onChange={handleInput}
                />
                {error.emailError ? (
                  <Error errorMsg={error.emailError} />
                ) : null}
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={signInData.password}
                  onChange={handleInput}
                />
              </div>
              <div className="pt-6">
                <button
                  className="w-[660px] py-[9px] pl-[33px] bg-primary outline-none border-none rounded-[20px] text-4 font-bold font-nunito text-white hover:bg-[#0000001a] hover:text-primary transition-all duration-300 ease-linear"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-[16px] text-primary leading-[120%]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-textColor font-normal font-roboto"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
