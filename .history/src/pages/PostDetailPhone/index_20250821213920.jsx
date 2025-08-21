import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [Phone, setPhone] = useState([]);

  // Bütün elanları yükləmək
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Phone/")
      .then((res) => setPhone(res.data))
      .catch((err) => console.error("Elanlar yüklənmədi:", err));
  }, []);

  // Seçilmiş elanı yükləmək
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Phone/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <p>Yüklənir...</p>;

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
    const date = new Date(isoString);
    return date.toTimeString().split(" ")[0].slice(0, 5);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Link to="/Katalog/Phone" className="inline-block mb-4 text-blue-500 underline">
        ← Geri
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-6">
        {/* Carousel */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold capitalize">
            {post.brand} {post.model} {post.type}
          </h1>

          {imageArray.length > 0 ? (
            <Carousel showThumbs showStatus={false} autoPlay infiniteLoop>
              {imageArray.map((img, idx) => (
                <div className="w-full h-[400px]" key={idx}>
                  <img
                    src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
                    alt={`Şəkil ${idx + 1}`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-xl">
              <p>Şəkil yoxdur</p>
            </div>
          )}
        </div>

        {/* Post detallar */}
        <div className="space-y-3 mt-4 md:mt-0">
          <p className="text-3xl font-black text-green-600">{post.price} AZN</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><span className="font-bold">Elan Başlıq:</span> {post.title}</li>
            <li><span className="font-bold">Marka:</span> {post.brand}</li>
            <li><span className="font-bold">Model:</span> {post.model}</li>
            <li><span className="font-bold">Yaddaş:</span> {post.storage}</li>
            <li><span className="font-bold">Ram:</span> {post.ram}</li>
            <li><span className="font-bold">Rəng:</span> {post.color}</li>
            <li><span className="font-bold">Sim Kart:</span> {post.sim_card}</li>
            <li><span className="font-bold">Yerləşmə:</span> {post.location}</li>
            <li><span className="font-bold">Əlaqə:</span> {post?.contact.phone}</li>
            <li><span className="font-bold">Ad:</span> {post?.contact.name}</li>
            <li><span className="font-bold">Email:</span> {post?.contact.email}</li>
            <li><span className="font-bold">Qeyd:</span> {post?.description}</li>
          </ul>

          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <p>Elanın nömrəsi: {post.id}</p>
            <p>{post.location}, {formatDate(post.data)}, {getCurrentTime(post.data)}</p>
          </div>
        </div>
      </div>

      {/* Bənzər elanlar */}
      <h2 className="text-2xl font-bold text-gray-400 mt-6 mb-2">Bənzər elanlar</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl">
        {[...Phone].reverse().map((item) => (
          <Link key={item._id} to={`/PostDetailPhone/${item._id}`}>
            <div className="border rounded-lg shadow-md hover:shadow-xl transition duration-150">
              <img
                src={item.images?.[0]?.startsWith("http") ? item.images[0] : "/no-image.jpg"}
                alt={item.title}
                className="w-full h-[180px] object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-bold text-green-600">{item.price} AZN</h3>
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
