import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import DrawerLayout from "../Layouts/DrawerLayout";


const ProtectedRoute = () => {
  return  (
    <DrawerLayout>
      <Outlet />
      <Footer />
    </DrawerLayout>
  )
};

export default ProtectedRoute;