import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import MainLayout from "./layout/MainLayout";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Messages from "./pages/messages/Messages";
import People from "./pages/people/People";
import Notification from "./pages/notification/Notification";
import Settings from "./pages/settings/Settings";
import BlockList from "./pages/blocklist/BlockList";
import FriendRequest from "./pages/friendrequest/FriendRequest";
import Friends from "./pages/friends/Friends";
import Groups from "./pages/groups/Groups";

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
