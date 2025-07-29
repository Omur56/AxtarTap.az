import React, { useEffect, useState } from "react";

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/ChatGPTDevTools/mock-car-data/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div>
      <h2>Avtomobil Elanları</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {cars.map((car) => (
          <div key={car.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={car.image} alt={car.title} style={{ width: "100%" }} />
            <h3>{car.title}</h3>
            <p>{car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
