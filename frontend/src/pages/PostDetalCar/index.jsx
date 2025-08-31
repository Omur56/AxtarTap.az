import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { X } from "lucide-react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
export default function PostDetailCar() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cars, setCars] = useState([]);
  const [zoomIndex, setZoomIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
 const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars`)
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Elanlar yüklənmədi:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars/${id}`)
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

  useEffect(() => {
    if (zoomIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomIndex, cars]);


    const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);


  if (loading) return  <Box className="min-h-screen mt-12" sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>;

    
  if (notFound || !post) return <div class="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-100 to-violet-200">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
		Elan Yüklənmədi
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-green-500 group active:text-green-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <router-link to="/">Əsas səhifə</router-link>
        </span>
      </a>
    </button>
</div>

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
    <div className="max-w-6xl min-h-screen mx-auto p-4">
      <Link to="/Katalog/Nəqliyyat">
     
        <button className="flex  items-center gap-2 mt-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Geri
        </button>
      </Link>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-xl p-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4 capitalize">
            {post.category} {post.brand} {post.model}
          </h1>

          <Carousel showThumbs showStatus={false} autoPlay infiniteLoop>
            {imageArray.map((img, index) => (
              <div
                key={index}
                className="w-full h-[400px] cursor-pointer"
                onClick={() => openZoom(index)}
              >
                <img
                  src={
                    img.startsWith("http")
                      ? img
                      : `${process.env.REACT_APP_API_URL}/uploads/${img}`
                  }
                  alt={`Şəkil ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Carousel>

          <p className="text-3xl font-bold text-black mt-4">
            {post.price} AZN
          </p>

          <ul className="text-sm text-gray-700 space-y-1 mt-4">
            <li>
              <span className="font-bold">Ban:</span> {post.ban_type}
            </li>
            <li>
              <span className="font-bold">İl:</span> {post.year}
            </li>
            <li>
              <span className="font-bold">Yürüş:</span> {post.km} km
            </li>
            <li>
              <span className="font-bold">Motor:</span> {post.motor}
            </li>
            <li>
              <span className="font-bold">Mühərrik növü:</span> {post.engine}
            </li>
            <li>
              <span className="font-bold">Transmissiya:</span>{" "}
              {post.transmission}
            </li>
            <li>
              <span className="font-bold">Yerləşmə:</span> {post.location}
            </li>
            <li className="line-clamp-4">
              <span className="font-bold">Qeyd:</span> {post?.description}
            </li>
          </ul>

          <div className="flex justify-between text-sm text-gray-500 mt-4">
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
              <span className="font-semibold">Ad:</span> {post?.contact?.name}
            </p>
            <p>
              <span className="font-semibold">Telefon:</span>{" "}
              <a
                href={`tel:${post?.contact?.phone}`}
                className="text-blue-600 font-bold ml-1"
              >
                {post?.contact?.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {post?.contact?.email}
            </p>
            <p>
              <span className="font-semibold">Şəhər:</span> {post.location}
            </p>
          </div>
          <a
            href={`tel:${post?.contact?.phone}`}
            className="text-white font-bold ml-1"
          >
            <button className="w-full mt-6 py-3 bg-green-500 hover:bg-red-700 text-white font-bold rounded-lg transition">
              Zəng et
            </button>
          </a>
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-gray-700 mt-10 mb-4">
        Bənzər elanlar
      </h2>
      <div className="p-4 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] w-full">
        {[...cars].map((car) => (
          <Link  target="_blank"
            rel="noopener noreferrer" key={car._id || car.id} to={`/cars/${car._id}` }>
            <div className="bg-white rounded-2xl sm:w-[240.4px] max-w-[240.4px] h-[300px] shadow-md hover:shadow-xl transition duration-200">
              <div className="w-full h-[178.5px] bg-gray-100 relative">
                <img
                  src={
                    car.images?.[0]?.startsWith("http")
                      ? car.images[0]
                      : "/no-image.jpg"
                  }
                  alt={car.brand}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl"
                  onClick={() => openZoom(0)}
                />
              </div>
              <div className="p-2">
                <h3 className="text-xl font-bold text-black">
                  {car.price} AZN ₼
                </h3>
                <h2 className="text-lg truncate w-50">
                  {car.category}, {car.brand}, {car.model}
                </h2>
                <p className="text-gray-600 truncate w-64">
                  {car.year}, {car.km} km
                </p>
                <p className="capitalize text-gray-400 text-[14px]">
                  {car.location}, {formatDate(car.data)}{" "}
                  {getCurrentTime(car.data)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {zoomIndex !== null && (
        <div
          className="fixed inset-0 flex flex-col bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeZoom}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-[200px] text-gray-600 hover:text-red-600"
          >
            <X size={35} />
          </button>
          <button
            className="absolute left-5 text-white text-8xl w-10 h-10 font-500 z-50"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          <img
            src={
              imageArray[zoomIndex].startsWith("http")
                ? imageArray[zoomIndex]
                : `${process.env.REACT_APP_API_URL}/uploads/${imageArray[zoomIndex]}`
            }
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
          />
          <button
            className="absolute  right-5 text-white text-8xl font-500 z-50"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >› 
          </button>
        </div>
      )}
    </div>
  );
}
