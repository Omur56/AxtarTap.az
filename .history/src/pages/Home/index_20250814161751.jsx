import React, { useEffect, useState } from "react";
import Katalog from "../../pages/Katalog";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomMenu from "../../components/MobileMenu";
import Header from "../../components/Header";

const Home = () => {


 
  const [cars, setCars] = useState([]);



  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Elanlar yüklənmədi:", err);
      }
    };

    fetchCars();
  }, []);

const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/homGarden')
      .then(res => {
        console.log("Gələn data:", res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error('Xəta baş verdi:', err);
      });
  }, []);
      
    
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




const [accessories, setAccessories] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/accessories')
      .then(res => {
        console.log("Gələn data:", res.data);
        setAccessories(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);

  const [realEstate, setRealEstate] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/realEstate')
      .then(res => {
        console.log("Gələn data:", res.data);
        setRealEstate(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);



    const [Household, setHousehold] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Household')
      .then(res => {
        console.log("Gələn data:", res.data);
        setHousehold(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);



 const [Phone, setPhone] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Phone')
      .then(res => {
        console.log("Gələn data:", res.data);
        setPhone(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);




   const [Clothing, setClothing] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Clothing')
      .then(res => {
        console.log("Gələn data:", res.data);
        setClothing(res.data);
      })
      .catch(err => {
        console.error('Xəta baise verdi:', err);
      });
  }, []);


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
   <div>
  <Header />
 
    
    <BottomMenu />
    <main className="   max-w-5xl mx-auto ">
    
    
       <Katalog className="m-auto justify-center items-center " />
     

  
  <h2 className="text-[25px] font-bold text-gray-400 mt-4">Nəqliyyat elanları</h2>
  <div className=" p-4 rounded-[4px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mt-10 w-full  bg-[#ffffff]">
    {[...cars].map((car) => (
      <Link  key={car.id} to={`/cars/${car.id}`}>
      <div 
        
        className="bg-white  rounded-[8px] sm:w-[240.4px]  max-w-[240.4px] h-[300px] shadow-md hover:shadow-xl hover:scale-5 transition duration-50"
      >
        <div className="w-full h-[178.5px]  bg-gray-100 relative">
          <img
            src={car.images[0]}
            alt={car.brand}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[8px]"
          />
        </div>
        <div className="p-2 ">
          <h3 className="text-xl font-bold font-black text-black">{car.price} AZN ₼</h3>
          <h2 className="text-lg  truncate w-50">{car.category}, {car.brand}, {car.model}</h2>
          <p className=" text-gray-600 truncate w-64">
            {car.year}, {car.km} km
          </p>
          <p className="capitalize text-gray-400 text-[16px]">{car.location}, {formatDate(car.data)} {getCurrentTime(car.data)} </p>
        </div>
      </div>
      </Link>
    ))}
  </div>





<h2 className="text-[25px] font-bold mb-1 text-gray-400  mt-4">Ev və bağ elanları</h2>
<div className="max-w-[1200px] p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10 my-auto w-full bg-[#ffffff]">
  
        {[...posts].map(post => (
  <Link key={post._id} to={`/elan/${post._id}`}>
    <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-50">
      <img
        src={
          post.images && post.images.length > 0
            ? (post.images[0].startsWith("http")
                ? post.images[0]
                : `http://localhost:5000/uploads/${post.images[0]}`)
            : "/no-image.jpg" // şəkil yoxdursa default
        }
        alt={post.title}
        className="w-full h-[178.5px] object-cover rounded-t-[8px]"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-black">{post.price} AZN ₼</h3>
        <h2 className="text-sm font-bold truncate w-64">{post.category}</h2>
        <h3 className="text-lg font-semibold truncate w-64">{post.brand}</h3>
        <p className="capitalize text-gray-400 text-[16px]">
          {post.location}, {formatDate(post.data)} {getCurrentTime(post.data)}
        </p>
      </div>
    </div>
  </Link>
))}

      </div>
      <h2 className="text-[25px] font-bold text-gray-400 mb-1 mt-4">Elektronika elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
  {[...elektronikaPost].reverse().map((item) => (
    <Link key={item._id} to={`/PostDetailElectronika/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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

    <h2 className="text-[25px] font-bold text-gray-400 mb-1 mt-4">Ehtiyyat hissələri və aksesuar elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mt-10 w-full bg-white ">
  {[...accessories].reverse().map((item) => (
    <Link key={item._id} to={`/PostDetailAcsesuar/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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



    <h2 className="text-[25px] font-bold mb-1 text-gray-400 mt-4"> Daşınmaz əmlak elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
  {[...realEstate].reverse().map((item) => (
    <Link key={item._id} to={`/PostRealEstate/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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
          <h2 className="text-sm font-bold truncate w-64">{item.title_type}, {item.type_building}, {item.location}</h2>
         
          <p className="capitalize text-gray-400 text-[16px]">
            {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>





    <h2 className="text-[25px] font-bold mb-1 text-gray-400 mt-4">Məişət texnikaları elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
  {[...Household].reverse().map((item) => (
    <Link key={item._id} to={`/accessory/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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
          <h2 className="text-sm font-boldtruncate w-64">{item.title}, {item.category}, {item.location}</h2>
          
          <p className="capitalize text-gray-400 text-[16px]">
            {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>


  <h2 className="text-[25px] font-bold mb-1 text-gray-400 mt-4">Telefon elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
  {[...Phone].reverse().map((item) => (
    <Link key={item._id} to={`/accessory/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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
          <h2 className="text-lg font-bold truncate w-64">{item.title}, {item.brand}, {item.model}</h2>
          <h3 className="text-lg font-semibold"></h3>
          <p className="capitalize text-gray-400 text-[16px]">
            {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>



  <h2 className="text-[25px] font-bold mb-1 text-gray-400 mt-4">Geyim elanları</h2>
   <div className="max-w-[1200px]  p-4 rounded-[8px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mt-10 w-full bg-white">
  {[...Clothing].reverse().map((item) => (
    <Link key={item._id} to={`/accessory/${item._id}`}>
      <div className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition duration-150">
        {/* Əsas səhifədə yalnız ilk şəkil */}
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
          <h2 className="text-lg font-bold truncate w-64">{item.title}, {item.brand}, {item.model}</h2>
          <h3 className="text-lg font-semibold"></h3>
          <p className="capitalize text-gray-400 text-[16px]">
            {item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>
    </main>
    </div>
  );
};

export default Home;
