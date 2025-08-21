import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostDetailPhone() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [Phone, setPhone] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Phone");
        setPhone(res.data);
      } catch (err) {
        console.error("Elanlar yüklənmədi:", err);
      }
    };
    fetchPhones();
  }, []);

  useEffect(() => {
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

  return (
    <div className="post-page max-w-5xl mx-auto p-2">
      <div className="max-w-5xl mx-auto p-6">
        <Link to="/Katalog/Phone" className="text-blue-500 underline mb-4 inline-block">
          ← Geri
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
          <div className="space-y-4 flex flex-col ">
            <h1 className="text-2xl mb-5 font-bold capitalize">
              {post.brand} {post.model} {post.type}
            </h1>

            <Carousel showThumbs={true} showStatus={false} autoPlay infiniteLoop>
              {imageArray?.map((img, index) => (
                <div className="w-full h-[400px]" key={index}>
                  <img
                    src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
                    alt={`Şəkil ${index + 1}`}
                    className="w-full object-contain rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="space-y-3 mt-[60px]">
            <p className="text-[40px] font-black text-black-600 font-semibold">{post.price} AZN</p>
            <ul className="text-xl underline list-inside text-gray-700 space-y-1">
              <li><span className="font-bold">Elan Başlıq: </span>{post.title}</li>
              <li><span className="font-bold">Marka: </span>{post.brand}</li>
              <li><span className="font-bold">Model: </span>{post.model}</li>
              <li><span className="font-bold">Yaddaş: </span>{post.storage}</li>
              <li><span className="font-bold">Ram: </span>{post.ram}</li>
              <li><span className="font-bold">Rəng: </span>{post.color}</li>
              <li><span className="font-bold">Sim Kart: </span>{post.sim_card}</li>
              <li><span className="font-bold">Yerləşmə: </span>{post.location}</li>
              <li><span className="font-bold">Əlaqə nömrəsi: </span>{post?.contact?.phone}</li>
              <li><span className="font-bold">Ad: </span>{post?.contact?.name}</li>
              <li><span className="font-bold">Email: </span>{post?.contact?.email}</li>
              <li><span className="font-bold">Qeyd: </span>{post?.description}</li>
            </ul>
          </div>

          <div className="flex items-center justify-between w-full h-[20px]">
            <p className="text-sm text-black">Elanın nömrəsi: {post.id}</p>
            <p className="text-sm text-black">{post.location}, {formatDate(post?.data)}, {getCurrentTime(post?.data)}</p>
          </div>
        </div>
      </div>

      {/* Bənzər elanlar */}
      <h2 className="text-[25px] font-bold text-gray-400 mt-4">Bənzər elanlar</h2>
      <div className="p-4 rounded-[4px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mt-10 w-full">
        {[...Phone].map((phone) => (
          <Link key={phone.id || phone._id} to={`/PostDetailPhone/${phone.id}`}>
            <div className="bg-white rounded-[8px] sm:w-[240.4px] max-w-[240.4px] h-[300px] shadow-md hover:shadow-xl hover:scale-5 transition duration-50">
              <div className="w-full h-[178.5px] bg-gray-100 relative">
                <img
                  src={phone.images[0]}
                  alt={phone.brand}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[8px]"
                />
              </div>
              <div className="p-2">
                <h3 className="text-xl font-bold font-black text-black">{phone.price} AZN ₼</h3>
                <h2 className="text-lg truncate w-50">{phone.brand}, {phone.model}</h2>
                <p className="text-gray-600 truncate w-64">
                  {phone.storage}, {phone.ram} RAM
                </p>
                <div className="flex items-center space-x-2">
                  <p className="capitalize text-gray-400 text-[16px]">{phone.location}, {formatDate(phone.data)} {getCurrentTime(phone.data)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
