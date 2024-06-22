import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SidebarWithBurgerMenu from "./pages/Admin/Navigation";
import Home from "./pages/User/Home";

import Footer from "./pages/User/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarWithBurgerMenuForFaculty from "./pages/Faculty/NavigationForFaculty";
import SidebarWithBurgerMenuForStdRep from "./pages/Stdrep/NavigationForStdRep";
import SidebarWithBurgerMenuForuser from "./pages/User/NavigationForUser";
import { Outlet } from "react-router";
const MainLayout = () => {
  // Assuming userInfo contains user information including the role
  const { userInfo } = useSelector((state) => state.auth);
  const isFaculty = userInfo && userInfo.isFaculty;
  const isAdmin = userInfo && userInfo.isAdmin;
  const isStdRep = userInfo && userInfo.isStdRep;
  return (
    <> 
    
    <ToastContainer> </ToastContainer>
      {isStdRep && <SidebarWithBurgerMenuForStdRep />}
      {isAdmin && <SidebarWithBurgerMenu />}
       {isFaculty && <SidebarWithBurgerMenuForFaculty />} 
       {!isStdRep && !isAdmin && !isFaculty && <SidebarWithBurgerMenuForuser/>}
    
       
      
     <Outlet/>
      
  
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
     
    </>
  );
};

export default MainLayout;
