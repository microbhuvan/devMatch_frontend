import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/Chat";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes basepath="/">
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            {/* <Route path="/changePassword" element={<ChangePassword />} /> */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
