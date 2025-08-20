import { NavLink } from "react-router-dom";



function TitleLogo () {
    return <div className="title-logo p-2 w-[100px] h-[30px] flex  items-center  mb-[0px] cursor-pointer">
       <NavLink className={`w-[100px] h-[30px]`} to={"/"}><p className="flex gap-1 text-blue-900 text-[25px] font-black font-sans"><img className="w-[30px] h-[30px]" src="/assets/TitleLogoImg/axtaricon.png" alt="TezTap" />Axtar<span className="text-green-500 font-black text-[25px]">Tap.az</span></p></NavLink>
       
         {/* <img src="/assets/TitleLogoImg/titleLogoAxtar.png" alt="TezTap" /> */}
    </div>;
}

export default TitleLogo;