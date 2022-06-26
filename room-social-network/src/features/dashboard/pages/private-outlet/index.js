import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios'

function PrivateOutlet() {
    return localStorage.getItem("role") == '0' ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateOutlet









