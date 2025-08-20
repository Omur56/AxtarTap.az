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


    const [home, setHome] = useState([]);



    useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/homGarden/");
        setHome(res.data);
      } catch (err) {
        console.error("Elanlar yüklənmədi:", err);
      }
    };

    fetchCars();
  }, []);
  
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
      
      <Link to="/Katalog/Ev_veBag"> <button class="flex mb-4 items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Geri
                </button></Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
        <div className="space-y-4">
     
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
      

       <h2 className="text-[25px] font-bold text-gray-400 mt-4">Bənzər elanlar</h2>
            <div className=" p-4 rounded-[4px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[15px] mt-10 w-full ">
              {[...home].map((homegarden) => (
                <Link  key={homegarden._id} to={`/PostDetailHome/${homegarden._id}` }>
                <div 
                  
                  className="bg-white  rounded-[8px] sm:w-[240.4px]  max-w-[240.4px] h-[300px] shadow-md hover:shadow-xl hover:scale-5 transition duration-500"
                >
                  <div className="w-full h-[178.5px]  bg-gray-100 relative">
                    <img
                      src={homegarden.images[0]}
                      alt={homegarden.brand}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[8px]"
                    />
                  </div>
                  <div className="p-2 ">
                    <h3 className="text-xl font-bold font-black text-black">{homegarden.price} AZN ₼</h3>
                    <h2 className="text-lg  truncate w-50">{homegarden.title}, {homegarden.brand}, {homegarden.model}</h2>
                 
                    <p className="capitalize text-gray-400 text-[16px]">{homegarden.location}, {formatDate(homegarden.data)} {getCurrentTime(homegarden.data)} </p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
      </div>
    
  );
}

  
   
    
    
