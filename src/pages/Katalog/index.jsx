import { useEffect, useState } from "react";
import {  useNavigate } from "react-router";
import { categories } from "./Cateqories";
import { Link } from "react-router";






const Katalog = () => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  // ✅ localStorage-dən əvvəlki seçimi oxu
  useEffect(() => {
    const savedId = sessionStorage.getItem("selectedCategoryId");
    if (savedId) {
      setActiveId(Number(savedId));
    }
  }, []);

  // ✅ Seçimi yadda saxla
  const handleCategoryClick = (id, path) => {
    setActiveId(id);
    localStorage.setItem("selectedCategoryId", id);
    navigate(`/Katalog/${encodeURIComponent(path)}`);

  };



  return (
      <div className='mx-auto  px-5 px-5 my-auto  max-w-[1200px]'>
     
    
    <div className="Katalog  -5 mx-auto   my-[30px] max-w-[1200px]  bg-[#ffffff] rounded-[8px]">
      
     
      <div className=" justify-center  grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 ">
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
              <span className={`text-[12px]  text-black font-bold leading-tight block  `}>{cat.label}</span>
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
