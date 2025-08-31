import React, { useState } from "react";

const brandsWithModels = {
  Abarth: ["500", "595", "124 Spider"],
  Acura: ["ILX", "MDX", "RDX"],
  Alfa_Romeo: ["Giulia", "Stelvio", "4C", "Mito", "33"],
  Aodessa: ["DessertCross 1000-300","DessertCross 1000-500","DessertCross 1000-700",],
  Audi: ["A3", "A4", "A6", "Q5", "Q7"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga"],
  Bugatti: ["Chiron", "Veyron"],
  Cadillac: ["Escalade", "Escalade ESV", "Escalade EXT"],
  Chevrolet: ["Avalanche", "Camaro", "Cruze", "Equinox", "Malibu"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Citroen: ["C3", "C4", "C5", "Berlingo"],
  Dacia: ["Logan", "Sandero", "Duster"],
  Dodge: ["Charger", "Grand Caravan", "Journey"],
  Fiat: ["500", "500L", "500X"],
  Ford: ["Fiesta", "Focus", "Mustang"],
  Honda: ["Civic", "Accord", "CR-V"],
  Hyundai: ["Accent", "Elantra", "Sonata"],
  Infiniti: ["Q50", "Q60", "Q70"],
  Jaguar: ["XE", "XF", "XJ"],
  Jeep: ["Cherokee", "Grand Cherokee", "Wrangler"],
  Kia: ["Sportage", "Sorento", "Optima"],
  Lamborghini: ["Aventador", "Huracan", "Urus"],
  Land_Rover: ["Range Rover", "Discovery", "Defender"],
  Lexus: ["IS", "ES", "RX"],
  Lincoln: ["MKZ", "MKC", "MKX"],
  Lotus: ["Elise", "Evora", "Exige"],
  Maserati: ["Ghibli", "Quattroporte", "GranTurismo"],
  Mazda: ["CX-5", "CX-9", "MX-5"],
  Mercedes: ["C-Class", "E-Class", "GLA"],
  Mini: ["Cooper", "One", "Countryman"],
  Mitsubishi: ["Lancer", "Outlander", "Pajero"],
  Nissan: ["Altima", "Sentra", "Pathfinder"],
  Opel: ["Astra", "Corsa", "Insignia"],
  Porsche: ["911", "Cayman", "Macan"],
  Renault: ["Clio", "Megane", "Captur"],
  Rolls_Royce: ["Phantom", "Ghost", "Wraith"],
  Saab: ["9-3", "9-5", "900"],
  Subaru: ["Impreza", "Legacy", "Outback"],
  Suzuki: ["Swift", "Vitara", "SX4"],
  Tesla: ["Model S", "Model 3", "Model X"],
  Toyota: ["Corolla", "Camry", "RAV4"],
  Volkswagen: ["Golf", "Passat", "Tiguan"],
  Volvo: ["S60", "XC60", "V90"],
  Aston_Martin: ["DB11", "Vantage", "DBS"],
  BMW: ["X5", "X3", "3 Series"],
  Ferrari: ["488", "F8 Tributo", "Portofino"],
  Hyundai: ["Tucson", "Santa Fe", "Kona"],
  Kia: ["Sportage", "Seltos", "Stinger"],
};

const MyBrandModelSelector = () => {
  const [brandInput, setBrandInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const brandOptions = Object.keys(brandsWithModels).filter((brand) =>
    brand.toLowerCase().includes(brandInput.toLowerCase())
  );

  const modelOptions =
    selectedBrand && brandsWithModels[selectedBrand]
      ? brandsWithModels[selectedBrand].filter((model) =>
          model.toLowerCase().includes(modelInput.toLowerCase())
        )
      : [];

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setBrandInput(brand);
    setModelInput(""); // Reset model input
    setSelectedModel("");
    setShowBrandDropdown(false);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setModelInput(model);
    setShowModelDropdown(false);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto mt-8 flex ">
      {/* Brand Input */}
      <div className="relative">
        <input
          type="text"
          value={brandInput}
          onChange={(e) => {
            setBrandInput(e.target.value);
            setShowBrandDropdown(true);
          }}
          onFocus={() => setShowBrandDropdown(true)}
          placeholder="Marka yazın"
          className="w-full p-2 border rounded capitalize"
        />
        {showBrandDropdown && brandOptions.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
            {brandOptions.map((brand) => (
              <li
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                className="p-2 hover:bg-gray-100 capitalize cursor-pointer"
              >
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Model Input (only if brand is selected) */}
      {selectedBrand && (
        <div className="relative">
          <input
            type="text"
            value={modelInput}
            onChange={(e) => {
              setModelInput(e.target.value);
              setShowModelDropdown(true);
            }}
            onFocus={() => setShowModelDropdown(true)}
            placeholder="Model yazın"
            className="w-full p-2 border rounded capitalize"
          />
          {showModelDropdown && modelOptions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
              {modelOptions.map((model) => (
                <li
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="p-2 hover:bg-gray-100 capitalize cursor-pointer"
                >
                  {model}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display selected */}
      
    </div>
  );
};

export default MyBrandModelSelector;
