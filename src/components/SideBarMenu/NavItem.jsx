import { Link } from "react-router-dom";

const NavItem = ({ icon, text, url, isOpen }) => {
  return (
    <Link
      to={url}
      className="flex items-center gap-4 hover:bg-[#01D063] p-2 rounded transition duration-200"
    >
      <span className="text-[15px] text-black text-orange-600 ">{icon}</span>
      {isOpen && <div className="text-[15px] text-black text-orange-600">{text}</div>}
    </Link>
  );
};

export default NavItem;
