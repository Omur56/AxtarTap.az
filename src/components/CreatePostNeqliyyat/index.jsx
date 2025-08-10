import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreatePost() {

 const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    id: Date.now(),
    category: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    location: "",
    images: [],
    km: "",
    motor: "",
    transmission: "",
    engine: "",
   contact: {
      name: "",
      email: "",
      phone: "",
    },
    liked: false,
    favorite: false,
    data: new Date(),
  });
  

  const [cars, setCars] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "email", "name"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
   
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  };





  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert("Ən çoxu 10 şəkil yükləyə bilərsiniz.");
      return;
    }
    setForm((prev) => ({ ...prev, images: files }));
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cars`);
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (key === "images") {
        form.images.forEach((file) => {
          formData.append("images", file);
        });
      } else if (key === "data") {
        formData.append("data", form.data.toISOString());
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      await axios.post("http://localhost:5000/api/cars", formData);
      resetForm();
      fetchCars();
    } catch (err) {
      console.error("Elan yüklənmədi:", err.response?.data || err.message);
    }
  };
 const resetForm = () => {
    setForm({
           id: Date.now(),
    category: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    location: "",
    images: [],
    km: "",
    motor: "",
    transmission: "",
    engine: "",
   contact: {
      name: "",
      email: "",
      phone: "",
    },
    liked: false,
    favorite: false,
    data: new Date(),
  });
    setForm((prev) => {
      return {
        ...prev,
        contact: { ...prev.contact, name: "", email: "", phone: "" },
      };
    })
    setImages([]);
    setPreview([]);
    setEditingId(null);
  }

  useEffect(() => {
    fetchCars();
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
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/Katalog"><i className="fa-solid fa-arrow-left text-xl">Geri</i></Link>
      <h2 className="text-2xl font-bold mb-4">Yeni Nəqliyyat Elanı</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-[1px] border-green-300/100 p-4  gap-5 shadow-[0_0_1px]  rounded-[8px]  w-full bg-[#ffffff]" 
      >
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text"
            value={form.category}
            name="category"
            placeholder="Kateqoriya"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input 
            value={form.brand}
            name="brand"
            placeholder="Marka"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input 
            value={form.model}
            name="model"
            placeholder="Ban Növü"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input type="number" 
            value={form.year}
            name="year"
            placeholder="İl"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input 
            value={form.motor}
            name="motor"
            placeholder="Motor"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input type="number" 
            value={form.km}
            name="km"
            placeholder="KM"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input type="number"
            value={form.price}
            name="price"
            placeholder="Qiymət"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <select 
            value={form.transmission}
            name="transmission"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          >
            <option value="">Transmissiya</option>
            <option value="Avtomat">Avtomat</option>
            <option value="Mexanika">Mexanika</option>
          </select>
          <select 
            value={form.engine}
            name="engine"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          >
            <option value="">Mühərrik</option>
            <option value="Dizel">Dizel</option>
            <option value="Benzin">Benzin</option>
          </select>
          <input 
            value={form.location}
            name="location"
            placeholder="Şəhər/Rayon"
            onChange={handleChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />
          <input 
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          />

          <input  type="number" name="phone" placeholder="Telefon" onChange={handleChange} value={form.contact.phone} className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
          <input  type="email" name="email" placeholder="Email" onChange={handleChange} value={form.contact.email} className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "  required/>
          <input  type="text" name="name" placeholder="Ad " onChange={handleChange} value={form.contact.name} className="w-full p-2 border-[1px] border-green-300/100 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "  required/>
          <textarea 
            value={form.description}
            name="description"
            placeholder="Əlavə Qeydlər"
            onChange={handleChange}
            className="w-full p-2 border rounded-[1px] border-green-300/100 capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
          /> 
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-[1px] border-green-300/100 hover:bg-blue-600">
  
            Əlavə et
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Əlavə olunan Elanlar</h3>
      <div className="p-4 border-[1px] border-green-300/100   rounded-[8px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full bg-[#ffffff]">
        {[...cars].reverse().map((car) => (
         
         
          <Link key={car.id}   to={`/cars/${car.id}`} >
            <div   className="w-[229px] h-[300px] flex flex-col max-w-xs shadow-xl rounded-xl shadow-md cursor-pointer bg-white rounded-[8px] max-h-[300px] hover:shadow-xl hover:scale-5 transition duration-50">
              <div className="flex gap-2 rounded-t-sm">
                {car.images?.[0] && (
                  <img
                    src={car.images[0]}
                    alt="car"
                    className="w-[229px] h-[178.75px] object-cover object-contain rounded-t-[8px]"
                  />
                )}
              </div>
              <div className="p-2">
                <h2 className="text-lg font-bold">{car.price} AZN</h2>
                <p className="font-sans capitalize text-[18px] line-clamp-1">
                  {car.category} {car.brand} {car.model}
                </p>
                <p className="capitalize text-[14px] font-sans font-[500] leading-tight">
                  {car.year}, {car.motor} L, {car.km} km
                </p>
                <p className="capitalize text-gray-400 text-[16px]">
                  {car.location}, {formatDate(car.data)} {getCurrentTime(car.data)}
                </p>
                <p className="capitalize text-gray-400 text-[16px]">{car._id}</p>




              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
