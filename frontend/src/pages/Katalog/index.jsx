import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { categories } from "../Katalog/Cateqories";
import { Link } from "react-router-dom";

const Katalog = () => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedId = sessionStorage.getItem("selectedCategoryId");
    if (savedId) {
      setActiveId(Number(savedId));
    }
  }, []);

  const handleCategoryClick = (id, path) => {
    setActiveId(id);
    localStorage.setItem("selectedCategoryId", id);
    navigate(`/Katalog/${encodeURIComponent(path)}`);
  };




  return (
    <div className="">
   
    <div className="min-h-[100px] w-full">
    <div className=" justify-center mx-auto my-[50px] place-items-center  max-w-[800px]  grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id, cat.path)}
          className="w-[100px] text-center"
        >
          <div className="">
            <button
              className={`${cat.bgColor}   transform hover:scale-105  mx-[7px]  border w-[80px] h-[80px] rounded-[10px] flex justify-center items-center shadow transition-all duration-200 
               `}
            >
              <img
                src={cat.icon}
                alt={cat.label}
                className="object-contain w-[70px] h-[70px]"
              />
            </button>
            <div className="mt-1">
              <span
                className={`text-[12px]  text-black font-bold leading-tight block  `}
              >
                {cat.label}
              </span>
            </div>
          </div>
        </Link>
      ))}
      
    </div>
    </div>
   
    </div>
  );
};

export default Katalog;



