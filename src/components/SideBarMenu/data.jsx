

import {
  FaHome,
  FaUser,
  FaCog,
  FaEnvelope,
  FaThLarge,
   FaPlus,
   FaSearch,
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
    icon:<FaPlus size={30} /> ,
  },
  {
    id: 4,
    text: "Profil",
    url: "/profile",
    icon: <FaUser />,
  },
  {
    id: 5,
    text: "Axtarış",
    url: "/search",
    icon: <FaSearch  />,
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
