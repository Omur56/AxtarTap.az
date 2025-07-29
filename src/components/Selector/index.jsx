import { useState } from "react";
import Modal from "./Modal";

const categories = ["Nəqliyyat", "Elektronika", "Geyimlər", "Zinət Əşyaları", "Telefonlar", "Daşınmaz əmlak", "Məişət Texnikası", "Ev və Bağ üçün", "Ehtiyyat hissələri və aksesuarlar"]; 

const Selector = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="w-[1000px] m-auto">
            <h1 className="text-2xl font-bold mb-4">Katalog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="w-[100px] text-center rounded-[10px]"
                >
                    <div
                        className={`border w-[100px] h-[80px] mt-5 rounded-[10px] flex justify-center items-center shadow transition-all duration-200 ${
                        selectedCategory === category ? "bg-blue-500 text-white" : ""
                        }`}
                    >
                        {category}
                    </div>
                </button>
                ))}
            </div>
            {showModal && <Modal onClose={handleCloseModal} />}
        </div>
    );
};            

export default Selector;