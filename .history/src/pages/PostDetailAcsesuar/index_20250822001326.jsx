import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AcsesuarDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [accessories, setAccessories] = useState([]);
  const [zoomIndex, setZoomIndex] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/accessories")
      .then((res) => setAccessories(res.data))
      .catch((err) => console.error("Xəta:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/accessories/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  
  
  


  if (loading) return <p>Yüklənir...</p>;
  if (notFound || !post) return <p>Elan tapılmadı.</p>;

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

  const openZoom = (index) => setZoomIndex(index);
  const closeZoom = () => setZoomIndex(null);
  const prevImage = () =>
    setZoomIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  const nextImage = () =>
    setZoomIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));

  return (
    <div className="post-page max-w-6xl  mx-auto p-4">
      <Link to="/Katalog/Ehtiyyat_hissələri_ve_aksesuarlar">
        {" "}
        <button class="flex  items-center gap-2 mt-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Geri
        </button>
      </Link>

      <div className="grid grid-cols-1 max-w-[1200px] lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-xl p-6">
        <div className="lg:col-span-2 space-y-6">
          <Carousel showThumbs showStatus={false} autoPlay infiniteLoop>
            {imageArray?.map((img, index) => (
              <div
                key={index}
                className="w-full h-[400px] cursor-pointer"
                onClick={() => openZoom(index)}
              >
                <img
                  src={
                    img.startsWith("http")
                      ? img
                      : `http://localhost:5000/uploads/${img}`
                  }
                  alt={`Şəkil ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Carousel>

          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold capitalize mb-2">
              {post.category} {post.brand} {post.model}
            </h1>
            <p className="text-3xl font-extrabold text-red-600">
              {post.price} AZN
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Təsvir</h2>
            <p className="text-gray-700 leading-relaxed">{post.description}</p>
          </div>

          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
            <p>Elanın nömrəsi: {post.id}</p>
            <p>
              {post.location}, {formatDate(post.data)},{" "}
              {getCurrentTime(post.data)}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl shadow-md p-5 h-fit">
          <h2 className="text-xl font-bold mb-4">Əlaqə məlumatı</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Ad:</span> {post?.contact.name}
            </p>
            <p>
              <span className="font-semibold">Telefon:</span>
              <a
                href={`tel:${post?.contact.phone}`}
                className="text-blue-600 font-bold ml-1"
              >
                {post?.contact.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {post?.contact.email}
            </p>
            <p>
              <span className="font-semibold">Şəhər:</span> {post.location}
            </p>
          </div>
          <a
            href={`tel:${post?.contact.phone}`}
            className="text-white font-bold ml-1"
          >
            {" "}
            <button className="w-full mt-6 py-3 bg-green-500 hover:bg-red-700 text-white font-bold rounded-lg transition">
              Zəng et
            </button>
          </a>
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-gray-700 mt-10 mb-4">
        Bənzər elanlar
      </h2>
      <div className="grid mx-auto my-auto max-w-[1000px] grid-cols-2 sm:grid-cols-2 md:grid-cols-3 min-h-screen lg:grid-cols-4 gap-2">
        {[...accessories]
          .reverse()
          .slice(0, 8)
          .map((item) => (
            <Link
              key={item._id || item.id}
              to={`/PostDetailAcsesuar/${item._id || item.id}`}
            >
              <div className="border w-[226px] h-[304px] rounded-lg bg-white shadow-sm hover:shadow-xl transition duration-200">
                <img
                  src={
                    item.images?.[0]?.startsWith("http")
                      ? item.images[0]
                      : "/no-image.jpg"
                  }
                  alt={item.title}
                  className="w-full h-[180px] object-cover rounded-t-lg cursor-pointer"
                  onClick={() => openZoom(0)}
                />
                <div className="p-3">
                  <h3 className="text-lg font-bold text-red-600">
                    {item.price} ₼
                  </h3>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.location}, {formatDate(item.data)}{" "}
                    {getCurrentTime(item.data)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>

    </div>
  );
}
