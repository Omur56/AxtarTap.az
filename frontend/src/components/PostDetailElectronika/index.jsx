import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";



export default function  PostDetailElectronika() {
    const { id } = useParams();
    const [electronikaPost, setElectronikaPost] = useState(null);


   useEffect(() =>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/electronika/${id}`)
    .then((res) => setElectronikaPost(res.data))
    .catch((err) => console.error("Xeta:", err));
   }, [id]);

   if(!electronikaPost) return null;

   return(
     <div className="max-w-[900px] mx-auto mt-10 bg-white p-5 rounded-lg shadow">
      {/* Karusel – bütün şəkillər */}
      <Carousel showThumbs={false} dynamicHeight={false} infiniteLoop>
        {electronikaPost.images?.length > 0 ? (
          electronikaPost.images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`Şəkil ${idx + 1}`} />
            </div>
          ))
        ) : (
          <div>
            <img src="/no-image.jpg" alt="Şəkil yoxdur" />
          </div>
        )}
      </Carousel>

      {/* Elan detalları */}
      <div className="mt-5">
        <h1 className="text-2xl font-bold">{electronikaPost.title}</h1>
        <p className="text-lg font-semibold">{electronikaPost.price} AZN ₼</p>
        <p className="text-gray-600">{electronikaPost.location}</p>
        <p className="mt-3">{electronikaPost.description}</p>

        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">Əlaqə</h3>
          <p>{electronikaPost.contact?.name}</p>
          <p>{electronikaPost.contact?.phone}</p>
          <p>{electronikaPost.contact?.email}</p>
        </div>
      </div>
    </div>
   )
}