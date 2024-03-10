import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from "../../validation/Validation";
import Error from "../../utils/Error";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../db/firebaseConfig";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import maleAvatar from "../../assets/images/male_avatar.png";
import femaleAvatar from "../../assets/images/female_avatar.png";

const Signup = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate();

  // handle form input fields
  const handleInput = (e) => {
    const registerInfo = { ...registerData };
    registerInfo[e.target.name] = e.target.value;
    setRegisterData(registerInfo);
  };

  // handle signup form
  const handleSignUp = (e) => {
    let mailError = emailValidation(registerData.email);
    // let passError = passwordValidation(registerData.password);
    // let confirmPassError = confirmPasswordValidation(
    //   registerData.confirmPassword,
    //   registerData.password
    // );
    setError({
      ...error,
      emailError: mailError,
      // passwordError: passError,
      // confirmPasswordError: confirmPassError,
    });
    setRegisterData({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // signUp a new user
    if (!error.emailError) {
      createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      )
        .then((userData) => {
          sendEmailVerification(auth.currentUser).then(
            updateProfile(auth.currentUser, {
              displayName: registerData.fullname,
              photoURL: `${
                registerData.gender == "male" ? maleAvatar : femaleAvatar
              }`,
            }).then(() => {
              set(ref(db, "users/" + userData.user.uid), {
                fullname: userData.user.displayName,
                username: registerData.username,
                email: userData.user.email,
                displayImage: userData.user.photoURL,
              });
            })
          );
          setIsLoaded(true);
          setTimeout(() => {
            setIsLoaded(false);
            navigate("/");
          }, 3000);
          toast.info("Verification Email Has Been Sent!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          let errorCode = err.code;
          if (errorCode == "auth/email-already-in-use") {
            setError({
              emailError: "📧 You have already use this email address!",
            });
          }
        });
    }
    e.preventDefault();
  };
  return (
    <section>
      <div className="container mx-auto">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <div className="h-[100vh] flex items-center justify-center flex-col">
          <h1 className="text-primary font-extrabold text-6xl pb-6 font-roboto text-center">
            dailyTalk
          </h1>
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
                  name="fullname"
                  value={registerData.fullname}
                  onChange={handleInput}
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="text"
                  placeholder="Enter a Username"
                  name="username"
                  value={registerData.username}
                  onChange={handleInput}
                />
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={registerData.email}
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
                  value={registerData.password}
                  onChange={handleInput}
                />
                {/* {error.passwordError ? (
                  <Error errorMsg={error.passwordError} />
                ) : null} */}
                <input
                  className="w-[660px] py-[9px] pl-[33px] bg-[#0000001a] outline-none border-none rounded-[20px] text-4 font-normal font-nunito text-primary"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleInput}
                />
                {/* {error.confirmPasswordError ? (
                  <Error errorMsg={error.confirmPasswordError} />
                ) : null} */}
              </div>
              <div className="flex flex-col gap-x-[8px]  py-[20px]">
                <div>
                  <h5 className="py-[10px]">Select Gender</h5>
                </div>
                <div className="flex gap-x-[10px]">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    onChange={handleInput}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    onChange={handleInput}
                  />
                  <label htmlFor="female">Female</label>
                </div>
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
                {isLoaded ? (
                  <div className="flex items-center justify-center">
                    <RotatingLines
                      visible={true}
                      height="75"
                      width="75"
                      color="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <button
                    className="w-[660px] py-[9px] pl-[33px] bg-primary outline-none border-none rounded-[20px] text-4 font-bold font-nunito text-white hover:bg-[#0000001a] hover:text-primary transition-all duration-300 ease-linear"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
            <p className="text-[16px] text-primary leading-[120%]">
              Already have an account?{" "}
              <Link to="/" className="text-textColor font-normal font-roboto">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
