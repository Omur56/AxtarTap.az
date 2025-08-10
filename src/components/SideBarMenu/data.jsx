

import {
  FaHome,
  FaUser,
  FaCog,
  FaEnvelope,
  FaThLarge,
   FaPlus,
} from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
export const menuItems = [
  {
    id: 1,
    text: "Əsas",
    url: "/",
    icon: <FaHome />,
  },
  {
    id: 2,
    text: "Katalog",
    url: "/Katalog",
    icon: <FaThLarge />,
  },
  {
    id: 3,
    text: "Yeni Elan",
    url: "/CreateCatalogPost",
    icon:<FaPlus /> ,
  },
  {
    id: 4,
    text: "Profil",
    url: "/profile",
    icon: <FaUser />,
  },
  {
    id: 5,
    text: "Qeydiyyat",
    url: "/register",
    icon: <MdPersonAdd size={24} />,
  },
  {
    id: 6,
    text: "Əlaqə",
    url: "/contact",
    icon: <FaEnvelope />,
  },

  {
    id: 7,
    text: "Settings",
    url: "/settings",
    icon: <FaCog />,
    
  },
    // {
  //   id: 5,
  //   text: "Haqqımızda",
  //   url: "/about",
  //   icon: <FaInfoCircle />,
  // },
];
