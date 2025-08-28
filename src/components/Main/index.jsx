import {Outlet,  useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import {axios} from "react"
import Footer from "../Footer";
import BottomMenu from "../MobileMenu";
import Header from "../Header";



const RootLayout = () => {
  const navigate = useNavigate();
 
  
  return (
   <div className=" bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
       <Header />
  
      <Outlet />
       <Footer/>
      <BottomMenu />
   </div>
  );
};

export default RootLayout;
