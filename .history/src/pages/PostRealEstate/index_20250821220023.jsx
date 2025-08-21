import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostDetailRealEstate() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [realEstate, setRealEstate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/RealEstate/")
      .then((res) => {
        setRealEstate(res.data);
      })
      .catch((err) => {
        console.error("Xəta baş verdi:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/RealEstate/${id}`)
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
    const time = date.toTimeString().split(" ")[0].slice(0, 5);
    return time;
  };

  return (
    <div className="post-page max-w-5xl mx-auto p-2">
      <div className="max-w-5xl mx-auto p-6">
        <Link
          to="/Katalog/Daşınmaz-Əmlak"
          className="text-blue-500 underline mb-4 inline-block"
        >
          ← Geri
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
          {/* Sol tərəf - şəkillər */}
          <div className="space-y-4 flex flex-col ">
            <h1 className="text-2xl mb-5 font-bold capitalize">
              {post.title_typee} - {post.type_building}
            </h1>

            <Carousel showThumbs={true} showStatus={false} autoPlay infiniteLoop>
              {imageArray?.map((img, index) => (
                <div className="w-full h-[400px]" key={index}>
                  <img
                    src={
                      img.startsWith("http")
                        ? img
                        : `http://localhost:5000/uploads/${img}`
                    }
                    alt={`Şəkil ${index + 1}`}
                    className="w-full object-contain rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Sağ tərəf - elan detalları */}
          <div className="space-y-3 mt-[60px]">
            <p className="text-[40px] font-black text-black-600 font-semibold">
              {post.price} AZN
            </p>
            <ul className="text-xl underline list-inside text-gray-700 space-y-1">
              <li>
                <span className="font-bold">Elanın adı: </span>
                {post.title_typee}
              </li>
              <li>
                <span className="font-bold">Elanın növü: </span>
                {post.type_building}
              </li>
              <li>
                <span className="font-bold">Bölmə: </span>
                {post.field}
              </li>
              <li>
                <span className="font-bold">Otaqlar: </span>
                {post.number_of_rooms}
              </li>
              <li>
                <span className="font-bold">Yerləşmə: </span>
                {post.location}
              </li>
              <li>
                <span className="font-bold">Şəhər: </span>
                {post.city}
              </li>
              <li>
                <span className="font-bold">Əlaqə nömrəsi: </span>
                {post?.contact?.phone}
              </li>
              <li>
                <span className="font-bold">Ad: </span>
                {post?.contact?.name}
              </li>
              <li>
                <span className="font-bold">Email: </span>
                {post?.contact?.email}
              </li>
              <li>
                <span className="font-bold">Qeyd: </span>
                {post?.description?.slice(0, 120)}...
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between w-full h-[20px]">
            <p className="text-sm text-black">Elanın nömrəsi: {post.id}</p>
            <p className="text-sm text-black">
              {post.location}, {formatDate(post?.data)}, {getCurrentTime(post?.data)}
            </p>
          </div>
        </div>
      </div>

      {/* Bənzər elanlar */}
      <h2 className="text-[25px] font-bold text-gray-400 mt-4">Bənzər elanlar</h2>
      <div className="p-4 rounded-[4px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mt-10 w-full">
        {[...realEstate].map((item) => (
          <Link key={item._id} to={`/PostRealEstate/${item._id}`}>
            <div className="bg-white rounded-[8px] sm:w-[240.4px] max-w-[240.4px] h-[300px] shadow-md hover:shadow-xl transition duration-150">
              <div className="w-full h-[178.5px] bg-gray-100 relative">
                <img
                  src={
                    item.images?.[0]?.startsWith("http")
                      ? item.images[0]
                      : "/no-image.jpg"
                  }
                  alt={item.title_typee}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[8px]"
                />
              </div>
              <div className="p-2">
                <h3 className="text-xl font-bold text-black">{item.price} AZN ₼</h3>
                <h2 className="text-lg truncate w-50">{item.title_typee}</h2>
                <h3 className="text-sm font-semibold truncate w-50">{item.type_building}</h3>
                <p className="capitalize text-gray-400 text-[16px]">
                  {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
