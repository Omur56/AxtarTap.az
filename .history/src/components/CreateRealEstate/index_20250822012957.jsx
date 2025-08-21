import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import { X } from "lucide-react";
import Swal from "sweetalert2"; 

export default function CreateRealEstate() {
    const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [realEstatePost, setRealEstatePost] = useState({
     id: Date.now(),
    title: "",
    title_type: "",
    type_building: "",
    field: "",
    number_of_rooms: "",
    location: "",
    city: "",
    price: "",
    images: [],
    description: "",
    contact: {
      name: "",
      email: "",
      phone: "",
      
    },
    liked: false,
      favorite: false,
      data: new Date(),
  });

  const [realEstateList, setRealEstateList] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [editingId, setEditingId] = useState(null);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setRealEstatePost((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else if (name === "data") {
      setRealEstatePost((prev) => ({ ...prev, data: new Date(value) }));
    } else {
      setRealEstatePost((prev) => ({ ...prev, [name]: value }));
    }
  };


  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/RealEstate");
      setRealEstateList(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const resetForm = () => {
    setRealEstatePost({
       id: Date.now(),
        title: "",
      title_type: "",
      type_building: "",
      field: "",
      number_of_rooms: "",
      location: "",
      city: "",
      price: "",
      images: [],
      description: "",
      contact: {
        name: "",
        email: "",
        phone: "",
        liked: false,
        favorite: false,
        data: new Date(),
      },
    });
    setImages([]);
    setPreview([]);
    setEditingId(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    
    images.forEach((file) => formData.append("images", file));


    Object.entries(realEstatePost).forEach(([key, value]) => {
      if (key === "data") return;
      if (key === "contact") {
        Object.entries(value).forEach(([k, v]) =>
          formData.append(`contact.${k}`, v)
        );
      } else {
        formData.append(key, value);
      }
    });

    formData.append("data", realEstatePost.data.toISOString());

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/realEstate/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/realEstate", formData);
          Swal.fire({
                    icon: "success",
                    title: "Elanınız uğurla yerləşdirildi!",
                    text: "İndi daxil ola bilərsiniz",
                    confirmButtonColor: "#3085d6",
                  });
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      Swal.fire({
                  icon: "error",
                  title: "Xəta baş verdi",
                  text: err.response?.data?.message || "Server xətası",
                  confirmButtonColor: "#d33",
                });
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/realEstate/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  const handleFavorite = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/realEstate/${id}/favorite`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Like
  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/realEstate/${id}/like`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setRealEstatePost({
      ...item,
      data: item.data ? new Date(item.data) : new Date(),
    });
    setEditingId(item._id);
    setPreview(
      item.images
        ? item.images.map((img) => `http://localhost:5000/uploads/${img}`)
        : []
    );
  };

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

  useEffect(() => {
    fetchItems();
  }, []);





     const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrls = [
  "http://localhost:5000/api/realEstate",

  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const requests = apiUrls.map(url => axios.get(url));
      const responses = await Promise.all(requests);

      let allData = [];
      responses.forEach(res => {
        if (Array.isArray(res.data)) allData = allData.concat(res.data);
      });

     

  
      const filtered = allData.filter(item => {
        const title_type = item.title_type?.toLowerCase() || "";
        const type_building = item.type_building?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";
        const field = item.field.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const city = item.city?.toLowerCase() || "";
        const engine = item.engine?.toLowerCase() || "";
        const year = item.year?.toLowerCase() || "";
        const motor = item.motor?.toLowerCase() || "";
        const transmission = item.transmission?.toLowerCase() || "";
        const ban_type = item.ban_type?.toLowerCase() || "";
        const price = item.price?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        return title_type.includes(query.toLowerCase()) ||
         type_building.includes(query.toLowerCase()) ||
          category.includes(query.toLowerCase()) ||
           location.includes(query.toLowerCase()) ||
            field.includes(query.toLowerCase()) ||
             city.includes(query.toLowerCase()) ||
              engine.includes(query.toLowerCase()) ||
               year.includes(query.toLowerCase()) ||
                motor.includes(query.toLowerCase()) ||
                 transmission.includes(query.toLowerCase()) ||
                  ban_type.includes(query.toLowerCase()) ||
                   price.includes(query.toLowerCase()) ||
                    description.includes(query.toLowerCase());
      });

      setResults(filtered);
    } catch (error) {
      console.error("API axtarış xətası:", error);
    } finally {
      setLoading(false);
    }
  };
    const [isLoading, setIsLoading] = useState(true);
  const [realEstate, setRealEstate] = useState([]);
  
  
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true); 
      try {
        const [ realEstate] = await Promise.all([
         
          axios.get("http://localhost:5000/api/realEstate"),
        
        ]);
  
      
        setRealEstate(realEstate.data);
      
      } catch (err) {
        console.error("API xətası:", err);
      } finally {
        setIsLoading(false); 
      }
    };
  
    fetchAll();
  }, []);
  return (
    <div className="min-h-screen ">
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full justify-center mx-auto my-auto max-w-[700px] min-w-[200px]">
        <div className="relative">
          <input
            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="AxtarTap..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if(e.key === "Enter") handleSearch(); }}
            type="text"
            name="search"
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-green-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-blue-700 focus:shadow-none active:bg-slate-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            Axtar
          </button>
        </div>
      </div>
       <Link className="" to="/Katalog"> <button class="flex items-center gap-2 bg-gray-200 mt-4 mb-4 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
      
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Geri
    </button></Link>
      <h2 className="text-2xl font-bold mb-4">
        Ən Son Daşınmaz Əmlak Elanları
      </h2>
      <div className="p-4">
      <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
            >
              Elan yerləşdirmək üçün formu aç
            </button>
      
          
            {isOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              
                <div className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
                  
                 
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                  >
                    <X size={28} />
                  </button>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-2">
        <input
          type="text"
          name="title_type"
          value={realEstatePost.title_type}
          onChange={handleInputChange}
          placeholder="Elanın adı"
          className=" border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="type_building"
          value={realEstatePost.type_building}
          onChange={handleInputChange}
          placeholder="Elanın tipi"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="field"
          value={realEstatePost.field}
          onChange={handleInputChange}
          placeholder="Elanın bölməsi"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="number_of_rooms"
          value={realEstatePost.number_of_rooms}
          onChange={handleInputChange}
          placeholder="Otaq sayı"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="location"
          value={realEstatePost.location}
          onChange={handleInputChange}
          placeholder="Lokasiya"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="city"
          value={realEstatePost.city}
          onChange={handleInputChange}
          placeholder="Şəhər"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="price"
          value={realEstatePost.price}
          onChange={handleInputChange}
          placeholder="Qiymət"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="description"
          value={realEstatePost.description}
          onChange={handleInputChange}
          placeholder="Təsvir"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
      
        <input
          type="text"
          name="contact.name"
          value={realEstatePost.contact.name}
          onChange={handleInputChange}
          placeholder="İstifadəçi adı"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="email"
          name="contact.email"
          value={realEstatePost.contact.email}
          onChange={handleInputChange}
          placeholder="İstifadəçi emaili"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />
        <input
          type="text"
          name="contact.phone"
          value={realEstatePost.contact.phone}
          onChange={handleInputChange}
          placeholder="İstifadəçi telefon nömrəsi"
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />

       
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        required
        />

       
        {preview.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="col-span-2 bg-blue-600 border-[1px] border-green-300/100 text-white py-2 rounded-[10px] hover:bg-blue-700  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        >
          {editingId ? "Elanı yenilə" : "Elanı əlavə et"}
        </button>
       
      </form>
      </div>
      </div>
)}
</div>
       <div className="mt-4">
              {loading && <p>Yüklənir...</p>}
              {loading && results.length === 0 && <p className="text-red-500">Nəticə tapılmadı.</p>}
      
              {!loading && results.length > 0 && (
                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.map((item, index) => (
                    <Link key={item.id || item._id}  to={`/item/${item._id} || ${item.id}`}>
                    <div key={index} className="border sm:w-[240.4px] max-w-[240.4px] h-[340px] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                    <img
        src={item.images && item.images.length > 0 ? item.images[0] : item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/placeholder.png"}
        alt={item.title || "Image"}
        className="w-full h-48 object-cover"
      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-1">{item.price} AZN</h2>
                        <h3 className="text-lg font-semibold mb-1">{item.title_type} {item.type_building} </h3>
                       <p className="capitalize text-gray-400 text-[16px]">{item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}</p>
                        
                       
                      </div>
                    </div>
                    </Link>
                  ))}
                  
                </div>
              )}
              <div className=" ring-2 w-full my-4 "></div>
            </div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Əlavə olunan Elanlar</h3>
      <div className="rounded-2xl grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">

                {isLoading ? (
  Array.from({ length: 20 }).map((_, i) => (
    <div
      key={i}
      className="w-[226px] h-[304.5px] bg-white rounded-2xl shadow-md  flex flex-col overflow-hidden relative"
    >
      
      <div className="w-full h-[178.5px] rounded-t-[8px] mb-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      
      
      <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-3/4 animate-shimmer"></div>
      
      <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-full animate-shimmer"></div>
      
      <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-2/3 animate-shimmer"></div>
      
     <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-2/3 animate-shimmer"></div>
    </div>
  ))
) : (
  <>


        {[...realEstateList].reverse().map((item) => (
           <Link  key={item._id || item.id}   to={`/PostRealEstate/${item._id}`}>
          <div key={item._id} className=" flex flex-col  w-[226px] h-[304px]  shadow-md cursor-pointer bg-[#ffffff] rounded-2xl  hover:shadow-xl hover:scale-5 transition duration-50 ease-in-out">
               {item.images && item.images.length > 0 && (
              <div className="flex gap-2 rounded-t-sm">
                {item.images ?? ((img, idx) => (
                  <img
                    key={idx}
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48
                 object-contain object-cover rounded-t-2xl"
                  />
                ))}
              </div>
            )}
           <div className="p-2">
            <h2 className="text-lg font-bold">{item.price} AZN</h2>
            <h4 className="font-sans capitalize text-[18px] line-clamp-1">{item.title_type} {item.type_building}</h4>
            <p className="font-sans capitalize text-[16px]"></p>
            
           
             <p className="capitalize text-gray-400 text-[16px]">{item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}</p>
           </div>
            </div>
          </Link>
        ))}
                </>
                         )}
      </div>
    </div>
    </div>
  );
}
