// src/components/CategorySelector/SubCategorySelector.jsx
import React from "react";

const subCategories = {
  "Nəqliyyat": ["BMW", "Mercedes", "Toyota", "Hyundai"],
  "Elektronika": ["Notebook", "Televizor", "Fotoaparat"],
  "Geyimlər": ["Kişi geyimi", "Qadın geyimi", "Uşaq geyimi"],
  "Zinət Əşyaları": ["Brilyant", "Qızıl", "Gümüş"],
  "Telefonlar": ["iPhone", "Samsung", "Xiaomi"],
  "Daşınmaz əmlak": ["Mənzil", "Ev", "Torpaq"],
  "Məişət Texnikası": ["Soyuducu", "Paltaryuyan", "Mikrodalğalı soba"],
  "Ev və Bağ üçün": ["Divan", "Masa", "Bağ alətləri"],
  "Ehtiyyat hissələri və aksesuarlar": ["Təkər", "Akkumulyator", "Yağlar"],
};

export default function SubCategorySelector({ selectedCategory, onSelectSub }) {
  if (!selectedCategory) return null;

  const options = subCategories[selectedCategory] || [];

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">{selectedCategory} üçün seçim et:</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              localStorage.setItem("selectedCategory", selectedCategory);
              localStorage.setItem("selectedSubCategory", sub);
              onSelectSub(sub);
            }}
            className="px-3 py-2 border rounded-lg hover:bg-blue-100 transition"
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}
