import { Outlet, useNavigate } from "react-router";
import Footer from "../Footer";
import BottomMenu from "../MobileMenu";
import SideBarMenu from "../SideBarMenu";


const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen max-w-full mx-auto my-auto  bg-[#ffffff] ">
      
      <SideBarMenu />
      <Outlet />
      <Footer />
      <BottomMenu />
    </div>
  );
};

export default RootLayout;
