import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";




export default function  PostDetailElectronika() {
    const { id } = useParams();
    const [electronikaPost, setElectronikaPost] = useState(null);
    const [electronikaPosts, setElectronikaPosts] = useState(null);
const [elektronikaPost, setElektronikaPost] = useState([]);
    


  useEffect(() => {
    axios.get('http://localhost:5000/api/electronika')
      .then(res => {
        console.log("Gələn data:", res.data);
        setElektronikaPost(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);



   useEffect(() =>{
    axios.get(`http://localhost:5000/api/electronika/${id}`)
    .then((res) => setElectronikaPost(res.data))
    .catch((err) => console.error("Xeta:", err));
   }, [id]);

   if(!electronikaPost) return null;


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




   





   return(
    <div className="max-w-[1200px] mx-auto">
     
     <div className="max-w-5xl mx-auto p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-4">
  
      <div className="space-y-4">
      <Carousel showThumbs={true} showStatus={false} autoPlay dynamicHeight={false} infiniteLoop>
        {electronikaPost.images?.length > 0 ? (
          electronikaPost.images.map((img, idx) => (
            <div className="w-full h-[400px]" key={idx}>
              <img className="w-full  object-contain rounded-xl" src={img} alt={`Şəkil ${idx + 1}`} />
            </div>
          ))
        ) : (
          <div>
            <img src="/no-image.jpg" alt="Şəkil yoxdur" />
          </div>
        )}
      </Carousel>
      </div>
 <div className="space-y-3">
          <h1 className="text-2xl font-bold capitalize">
            {electronikaPost.category} {electronikaPost.brand} {electronikaPost.model}
          </h1>
          <p className="text-xl text-green-600 font-semibold">{electronikaPost.price} AZN</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Kategoriya: {electronikaPost.category}</li>
            <li>Başlıq: {electronikaPost.title}</li>
            <li>Marka: {electronikaPost.brand}</li>
            <li>Model: {electronikaPost.model}</li>
            <li>Yerləşmə: {electronikaPost.location}</li>
            <li>Əlaqə nömrəsi: {electronikaPost.contact.phone}</li>
            <li>Ad: {electronikaPost.contact.name}</li>
            <li>Email: {electronikaPost.contact.email}</li>
            <li>Qeyd: {electronikaPost.description}</li>
            
            
            
          </ul>
          
        </div>
        <div className=" flex items-center justify-between w-full h-[20px]">
        <p className="text-sm text-black">Elanın nömrəsi:  {electronikaPost.id}</p>
        <p className="text-sm text-black">{electronikaPost.location},   {formatDate(electronikaPost.data)}, {getCurrentTime(electronikaPost.data)}</p>
        </div>
      </div>
    </div>
            <h2 className="text-[25px] font-bold text-gray-400 mb-1 mt-4">Bənzər elanlar</h2>
             <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
            {[...elektronikaPost].reverse().map((item) => (
              <Link key={item._id} to={`/PostDetailElectronika/${item._id}`}>
                <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
                 
                  <img
                    src={
                      item.images?.[0]?.startsWith("http")
                        ? item.images[0]
                        : "/no-image.jpg"
                    }
                    alt={item.title}
                    className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-black">{item.price} AZN ₼</h3>
                    <h2 className="text-sm font-bold truncate w-64">{item.category}</h2>
                    <h3 className="text-lg font-semibold truncate w-64">{item.title}</h3>
                    <p className="capitalize text-gray-400 text-[16px]">
                      {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
    </div>
   )
}


   
   