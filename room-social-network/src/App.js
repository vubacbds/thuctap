import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Link , Redirect} from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./App.scss";
import NotFound from "./components/not-found";
import userService from "./services/userService";
import RoomAdd from "./features/main/pages/room-add";

//Lazy loading
const HomePage = React.lazy(() => import("./features/main"));
const DashBoard = React.lazy(() => import("./features/dashboard"));
const Login = React.lazy(() => import("./components/login"));
const Regist = React.lazy(() => import("./components/regist"));
const Profile = React.lazy(() => import("./features/main/pages/profile"));


function App() {
  // useEffect(()=>{
  //   //test call api login
  //   userService.authenticate({
  //     "username": "nghiabui",
  //     "password": "12345"
  //   }).then((res) => {
  //     if(res.accessToken){
  //       console.log("Token ", res.accessToken);
  //       localStorage.setItem("accessToken", res.accessToken);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }, []);
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="app__spin">
            <Spin tip="Loading..." />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/room-social-network" replace />} />
            <Route path="/room-social-network/*" element={<HomePage/>} />
            <Route path="/admin-management/*" element={<DashBoard/>} />
            <Route path="/login/*" element={<Login/>} />
            <Route path="/regist/*" element={<Regist/>} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/RoomAdd" element={<RoomAdd/>} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
} 

export default App;