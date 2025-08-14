import Katalog from "../Katalog";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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
  if (notFound || !post) return <p>Elan tapılmadı.</p>;

  // Şəkil array-i hazırlayırıq
const imageArray = Array.isArray(post.images)
  ? post.images
  : post.images
  ? [post.images]
  : [];




  const formatDate = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();

  const today = new Date(now.setHours(0, 0, 0, 0));
  const postDay = new Date(postDate.setHours(0, 0, 0, 0));

  const diffTime = today - postDay;
  const oneDay = 24 * 60 * 60 * 1000;

  if (diffTime === 0) return "bugün";
  if (diffTime === oneDay) return "dünən";

  return postDate.toLocaleDateString("az-AZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};




const getCurrentTime = (isoString) => {
  const date= new Date(isoString);
  const time = date.toTimeString().split(" ")[0].slice(0,5)
  return time;
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Katalog />

      <Link
        to="/Katalog/Ev_veBag"
        className="text-blue-500 underline mb-4 inline-block"
      >
        ← Geri
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
        <div className="space-y-4">
        {/* 🖼️ Karusel */}
        {[...imageArray] && imageArray.length > 0 ? (
          <Carousel
    showThumbs={true}
    showStatus={false}
    infiniteLoop
    autoPlay
    dynamicHeight
  >
    {imageArray.map((img, index) => (
      <div className="w-full h-[400px]" key={index}>
        <img
          src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
          alt={`Şəkil ${index + 1}`}
          className="h-full object-contain rounded-lg"
        />
      </div>
    ))}
  </Carousel>
        ) : (
          <p className="text-white font-semibold">Şəkil yoxdur</p>
        )}
        </div>

        {/* 📄 Elan detalları */}
        <div className="space-y-3">
        <h1 className="text-2xl font-bold capitalize">{post.title}, {post.brand}, {post.model}</h1>
         <p className="text-xl text-green-600 font-semibold">
          {post.price} ₼
        </p>
         <ul className="text-sm text-gray-700 space-y-1">
            <li>Kateqoriya: {post.category}</li>
            <li>Məhsulun adı: {post.title}</li>
            <li>Marka: {post.brand}</li>
            <li>Model: {post.model}</li>
            <li>Yerləşmə: {post.location}</li>
            <li>Əlaqə nömrəsi: {post?.contact.phone}</li>
            <li>Ad: {post?.contact.name}</li>
            <li>Email: {post?.contact.email}</li>
            <li>Qeyd: {post?.description}</li>
            
            
          </ul>

        </div>
        <div className=" flex items-center justify-between w-full h-[20px]">
        <p className="text-sm text-black">Elanın nömrəsi: {post.id}</p>
        <p className="text-sm text-black">{post.location},   {formatDate(post.data)}, {getCurrentTime(post.data)}</p>
        </div>
      </div>
      
      </div>
    
  );
}

  
   
    
    
