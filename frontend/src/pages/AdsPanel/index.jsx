import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "../Home";  
export default function AdsPanel() {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ads`);
      setAds(res.data);
    } catch (err) {
      console.error("Reklamları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="flex  justify-between gap-4">
      {/* Sol panel */}
      <div className=" w-1/6 sticky top-4 h-screen  p-2 p-4">
        {ads.slice(0, 3).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
            <img
              src={`${process.env.REACT_APP_API_URL}/${ad.image}`}
              alt={ad.title}
              className="rounded-md shadow-md"
            />
          </a>
        ))}
      </div>

      {/* Orta məzmun */}
      <div className="flex-1 ">  </div>

      {/* Sağ panel */}
      <div className="w-1/6 sticky top-4 h-screen b p-2">
        {ads.slice(3, 6).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
            <img
              src={`${process.env.REACT_APP_API_URL}/${ad.image}`}
              alt={ad.title}
              className="rounded-md shadow-md"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
