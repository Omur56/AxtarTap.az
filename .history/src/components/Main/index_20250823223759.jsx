import {Outlet,  useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import {axios} from "react"
import Footer from "../Footer";
import BottomMenu from "../MobileMenu";
import Header from "../Header";



const RootLayout = () => {
  const navigate = useNavigate();
   const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data);
    } catch (err) {
      console.error("Reklamları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
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
