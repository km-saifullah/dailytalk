import React, { useEffect, useState } from "react";
import Image from "../../utils/Image";
import img from "../../assets/images/john.png";
import { useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { Hourglass } from "react-loader-spinner";
import { colors } from "../../utils/Colors";

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
  return (
    <div className="flex items-center justify-between flex-wrap  gap-[20px] pt-[25px]">
      {userList && userList.length > 0 ? (
        userList.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div
              className="w-[75px] h-[75px] rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${colors[Math.floor(Math.random() * 10)]}`,
              }}
            >
              <figure>
                <h1 className="text-white text-4xl font-robotoFlex font-bold uppercase">
                  {user.fullname[0]}
                </h1>
                {/* <Image
                  className="h-full w-full object-cover"
                  imgSrc={user.displayImage}
                  altText="user image misiing"
                /> */}
              </figure>
            </div>

            <div className="px-[10px]">
              <h5 className="text-primary text-[20px] font-bold font-nunito leading-[140%] capitalize">
                {user.fullname}
              </h5>
              <p className="text-textColor text-[14px] font-normal font-roboto leading-[120%] capitalize">
                {status}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-[100vh] h-[50vh]">
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
