import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashBoardPage from "./pages/dashborad";
import Home from "./pages/header";
import UserManagement from "./pages/user-management";
import PostManagement from "./pages/post-management";
import "./index.scss";

function DashBoard() {
    return (
        <Routes>
            <Route path="/" element={<DashBoardPage />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Home />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/post-management" element={<PostManagement />} />
                <Route path="/interface" element={<span>Tính năng đang được phát triển...</span>} />
                <Route path="/key-words" element={<span>Tính năng đang được phát triển...</span>} />
            </Route>
        </Routes>
    );
}

export default DashBoard;


