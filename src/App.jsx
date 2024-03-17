import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages";
import Signin from "./pages";
import Signup from "./pages";
import Home from "./pages";
import Messages from "./pages";
import People from "./pages";
import Notification from "./pages";
import Settings from "./pages";
import BlockList from "./pages";
import FriendRequest from "./pages";
import Friends from "./pages";
import Groups from "./pages";

// All Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/people" element={<People />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/blocklist" element={<BlockList />} />
        <Route path="/friendrequest" element={<FriendRequest />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/groups" element={<Groups />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
