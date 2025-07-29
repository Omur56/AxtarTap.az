import { useEffect, useState } from "react";
import Header from "../../components/Header";
import {  useNavigate } from "react-router";
const categories = [
  { id: 1,  path: "Nəqliyyat", label: "Nəqliyyat", icon: "./assets/Katalog/carIcon-removebg-preview.png" },
  { id: 2, path: "Ev_veBag", label: "Ev və Bağ üçün", icon: "./assets/Katalog/mebeltransparent.png" },
  { id: 3, path: "Elektronika", label: "Elektronika", icon: "./assets/Katalog/elektronika.png" },
  { id: 4, path: "Ehtiyyat_hissələri_ve_aksesuarlar", label: "Ehtiyyat hissələri və aksesuarlar", icon: "./assets/Katalog/ehtiyyatHisseleri.png" },
  { id: 5, path: "Daşınmaz_əmlak", label: "Daşınmaz əmlak", icon: "./assets/Katalog/binatransparent-removebg-preview.png" },
  { id: 6, path: "Məişət_Texnikası", label: "Məişət Texnikası", icon: "./assets/Katalog/məişət.png" },
  { id: 7, path: "Telefonlar", label: "Telefonlar", icon: "./assets/Katalog/iphone-13.png" },
  { id: 8, path: "Geyimlər", label: "Geyimlər", icon: "./assets/Katalog/geyimlər.png" },
  { id: 9, path: "Zinət_əşyaları", label: "Zinət Əşyaları", icon: "./assets/Katalog/qizil.png" },
];

const Katalog = () => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  // ✅ localStorage-dən əvvəlki seçimi oxu
  useEffect(() => {
    const savedId = localStorage.getItem("selectedCategoryId");
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
    <div className="Katalog m-auto w-[650px]">
      <Header />
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[900px] w-full m-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id, cat.path)}
            className="w-[100px] text-center rounded-[10px]"
          >
            <button
              className={`border w-[100px] h-[80px] mt-5 rounded-[10px] flex justify-center items-center shadow transition-all duration-200 ${
                activeId === cat.id
                  ? "bg-indigo-600 border-indigo-600 shadow-[0_6px_10px_rgba(0,0,0,0.2)]"
                  : "bg-white border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              }`}
            >
              <img
                src={cat.icon}
                alt={cat.label}
                className="object-contain w-[70px] h-[70px]"
              />
            </button>
            <div className="mt-1">
              <span className="text-[12px] font-bold leading-tight block">{cat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Katalog;
