import { NavLink } from "react-router";



const NavBar = ()=> {







    return ( 
     <div className="navbar-container">
    <nav className="navbar font-bold text-[20px] grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  text-sky-700  flex gap-[30px] justify-center mt-10">
        {/* <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/"}>Əsas səhifə</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Katalog"}>Kategorya</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/about"}>About</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Users"}>Users</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Users/UsersDetails"}>Users Detail</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Dashboard"}>Dashboard</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Dashboard/Settings"}>Settings</NavLink>
        <NavLink className={({isActive}) => isActive ? "text-red-700" : "text-sky-700" } to={"/Dashboard/Analytics"}>Analytics</NavLink>
         */}
      
    </nav>
    </div>  
    )
};
export default NavBar;


