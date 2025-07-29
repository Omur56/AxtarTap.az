import { NavLink } from "react-router";



function TitleLogo () {
    return <div className="title-logo w-[100px] h-[20px]   flex  cursor-pointer">
       <NavLink to={"/"}> <img className="w-[80px] h-[80px]" src="./assets/TitleLogoImg/TitleLogoImg.png" alt="TezTap" /> </NavLink>
       
        
    </div>;
}

export default TitleLogo;