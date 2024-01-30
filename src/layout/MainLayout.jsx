import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default MainLayout;
