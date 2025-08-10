import Katalog from "../Katalog";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams(); // URL-dən elan id-sini alırıq
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/homGarden/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yüklənir...</p>;
  if (notFound) return <p>Elan tapılmadı.</p>;

  // image sahəsi bir stringdirsə array kimi göstərmək üçün düzəldirik
  const imageArray = Array.isArray(post.image)
    ? post.image
    : [post.image];

  return (
    <div className=" mx-auto my-auto w-[1000px]">

        <Katalog/>
    <Link to="/Katalog/Ev_veBag" className="text-blue-500 underline mb-4 inline-block">
        ← Geri
      </Link>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-6 rounded-lg mt-10 mb-10 bg-gradient-to-br from-orange-500 via-pink-500 to-orange-500">
  

        
      {/* 🖼️ Karusel şəkil keçidi */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        dynamicHeight
      >
        {imageArray.map((img, index) => (
          <div key={index} >
            <img
              src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
              alt={`Şəkil ${index + 1}`}
              className="h-[300px] object-contain rounded-lg"
            />
            
          </div>
        ))}

       
      </Carousel>

      {/* 📄 Elan detalları */}
      <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
      <p className="text-gray-600 mt-2">{post.description}</p>
      <p className="text-xl text-blue-500 font-semibold mt-4">{post.price} ₼</p>
      <div className="mt-6 text-sm text-gray-700 space-y-1">
        <p><strong>Kateqoriya:</strong> {post.category}</p>
        <p><strong>Brend:</strong> {post.brand}</p>
        <p><strong>Şəhər:</strong> {post.location}</p>
        <p><strong>Əlaqə:</strong> {post.contact?.name} - {post.contact?.email}</p>
      </div>
    </div>
    </div>
  );
}
