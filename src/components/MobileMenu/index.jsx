import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../SideBarMenu/data";

const BottomMenu = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Aşağı scroll → gizlət
        setShowNavbar(false);
      } else {
        // Yuxarı scroll → göstər
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 w-full rounded-t-[10px] bg-white text-gray-500 flex justify-around items-center py-4 z-50 shadow-lg border-t border-gray-300 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {menuItems.slice(0, 5).map((item) => (
        <Link
          key={item.id}
          to={item.url}
          className="flex flex-col items-center text-xs hover:text-[#01D063] transition-colors"
        >
          <div className="text-[25px]">{item.icon}</div>
          <span className="text-[10px]">{item.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomMenu;

