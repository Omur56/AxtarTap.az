


import React from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { menuItems } from "./data";
import NavItem from "./NavItem";

const TopBarMenu = () => {
  const [isOpen, setIsOpen] = React.useState(true); 

  return (
    <div className="hidden md:flex  rounded-t-[10px] top-0  w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2 w-full">
     
        <button
          className="text-orange-600"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <FaBars size={20} />
        </button>

  
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col md:flex-row gap-6 md:gap-10 items-center`}
        >
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              text={item.text}
              url={item.url}
              isOpen={true} 
              setIsOpen={setIsOpen}
            />
          ))}
        </motion.nav>
      </div>
    </div>
  );
};

export default TopBarMenu;
