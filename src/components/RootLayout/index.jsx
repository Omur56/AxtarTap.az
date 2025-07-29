import { Outlet, useNavigate } from "react-router";
import NavBar from "../NavBar";
import TitleLogo from "../TitleLogo";
import CustomButton from "../Button";
import Search from "../Search";
import Footer from "../Footer";

const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TitleLogo />
      <Search />

      <div className="TitleButtonGroup justify-end mr-5 flex -mt-8 gap-[30px]  ">
        <CustomButton title="Daxil ol" onClick={() => navigate("/login")} />
        <CustomButton title="Qeydiyyat" onClick={() => navigate("/register")} />
        <CustomButton title="Elan ver"onClick={() => navigate("/create-post")}/>
      </div>

      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
