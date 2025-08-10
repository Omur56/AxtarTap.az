import { NavLink } from "react-router-dom";
import { Outlet, useNavigate } from "react-router";
import CustomButton from "../Button";
import TitleLogo from "../TitleLogo";



import Search from "../Search";






function Header () {
    const navigate = useNavigate();
    return (
        <header className="header ring-1 ring-green-500  mx-auto my-auto">  
        <div className="flex justify-between items-center py-4 mx-auto my-auto max-w-[1200px]">
        <TitleLogo />
       
</div>  
        
      {/* <div className=" justify-end  flex mt-8 gap-[30px]  ">
        <CustomButton title="Daxil ol" onClick={() => navigate("/login")} />
        <CustomButton title="Qeydiyyat" onClick={() => navigate("/register")} />
        <CustomButton path="/CreateCatalogPost" title="Elan ver"onClick={() => navigate("/CreateCatalogPost")}/>
      </div> */}

      
      <Outlet />
    

        </header>
        
      
    )
};

export default Header;