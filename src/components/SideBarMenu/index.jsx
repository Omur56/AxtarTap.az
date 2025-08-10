// import React from "react";
// import { motion } from "framer-motion";
// import { FaBars } from "react-icons/fa";
// import { menuItems } from "./data";
// import NavItem from "./NavItem";

// const SideBarMenu = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
 

//   return (
//     <div className="hidden md:block  fixed top-0 left-0 z-50 ">
//       <motion.div
//         initial={{ width: 65 }}
//         animate={{ width: isOpen ? 150 : 65 }}
//         transition={{ duration: 0.3 }}
//         className=" bg-[#fff] h-screen text-orange-600 p-4 "
//       >
//         <button className="text-[15px] mb-4 " 
//         type="button" onClick={() => setIsOpen((prev) => !prev)} >
//           <FaBars size={20} />
//         </button>

//         <nav className="flex flex-col gap-11">
//           {menuItems.map((item) => (
//             <NavItem
//               key={item.id}
//               icon={item.icon}
//               text={item.text}
//               url={item.url}
//               isOpen={isOpen}
//               setIsOpen={setIsOpen}
//             />
//           ))}
//         </nav>
//       </motion.div>
//     </div>
//   );
// };

// export default SideBarMenu;




import React from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { menuItems } from "./data";
import NavItem from "./NavItem";

const TopBarMenu = () => {
  const [isOpen, setIsOpen] = React.useState(true); 

  return (
    <div className="hidden md:flex  top-0  w-full z-50 bg-white shadow-md">
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
