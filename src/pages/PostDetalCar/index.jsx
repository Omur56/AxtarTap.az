import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostDetalCar() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {

      console.log("Elan ID-si:", id);
   
    if (!id) {
    setNotFound(true);
    setLoading(false);
   
    return;

  }
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
    
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
  const imageArray = Array.isArray(post.images)
    ? post.images
    : [post.images];


   
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/Katalog/Nəqliyyat" className="text-blue-500 underline mb-4 inline-block">
        ← Geri
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
        {/* Şəkillər Carousel */}
        <div className="space-y-4">
          <Carousel showThumbs={true} showStatus={false} infiniteLoop>
            {post.images?.map((img, index) => (
                
              <div key={index}>
                <img
                  src={img}
                  alt={`car-${index}`}
                  className="w-full h-[400px] object-contain rounded-xl"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Ətraflı məlumat */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold capitalize">
            {post.category} {post.brand} {post.model}
          </h1>
          <p className="text-xl text-green-600 font-semibold">{post.price} AZN</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>İl: {post.year}</li>
            <li>Yürüş: {post.km} km</li>
            <li>Motor: {post.motor}</li>
            <li>Mühərrik növü: {post.engine}</li>
            <li>Transmissiya: {post.transmission}</li>
            <li>Yerləşmə: {post.location}</li>
            <li>Əlaqə nömrəsi: {post?.contact.phone}</li>
            <li>Ad: {post?.contact.name}</li>
            <li>Qeyd: {post?.description}</li>
            
          </ul>
          
        </div>
      </div>
    </div>
  );
}
