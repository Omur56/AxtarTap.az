import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TitleLogo from "../TitleLogo";
import { FaSignInAlt, FaUserPlus, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Page load zamanı localStorage yoxlanılır
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/"); // logout sonrası əsas səhifəyə yönləndir
  };

  return (
    <header className="header bg-gradient-to-r from-sky-700 to-green-500 mx-auto my-auto shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] rounded-b-[10px]">  
      <div className="flex justify-between items-center py-4 mx-auto my-auto max-w-[1200px]">
        <TitleLogo />

        <div className="flex gap-3">
          {!isLoggedIn && (
            <>
              <button
                className="flex hidden md:flex transform ease-in-out duration-500 items-center text-[14px] font-[500] gap-2 bg-transparent border border-blue-500 text-white hover:text-white px-3 py-1 rounded-[4px] hover:bg-blue-500"
                onClick={() => navigate("/login")}
              >
                <FaSignInAlt /> Daxil ol
              </button>
              <button
                className="flex hidden md:flex transform ease-in-out duration-500 items-center text-[14px] font-[500] gap-2 bg-transparent border border-blue-500 text-white hover:text-white px-3 py-1 rounded-[4px] hover:bg-blue-500"
                onClick={() => navigate("/reqister")}
              >
                <FaUserPlus /> Qeydiyyat
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <button
                className="flex hidden md:flex transform ease-in-out duration-500 items-center text-[14px] font-[500] gap-2 bg-transparent border border-blue-500 text-white hover:text-white px-3 py-1 rounded-[4px] hover:bg-blue-500"
                onClick={() => navigate("/profile")}
              >
                <FaUser /> Profil
              </button>
              <button
                className="flex hidden md:flex transform ease-in-out duration-500 items-center text-[14px] font-[500] gap-2 bg-red-600 text-white px-3 py-1 rounded-[4px] hover:bg-red-400"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}

          <button
            className="flex hidden md:flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-[4px] hover:bg-red-400 transition"
            onClick={() => navigate("/CreateCatalogPost")}
          >
            <FaPlus /> Yeni Elan
          </button>
        </div>
      </div>  
    </header>
  );
}

export default Header;
