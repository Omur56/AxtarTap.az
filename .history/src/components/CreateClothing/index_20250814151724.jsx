import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateClothing() {
const [clothingPost, setClothingPost] = useState({
    title: "",
    type: "",
    description: "",
    image: "",
    price: "",
    category: "",
    condition: "",
    size: "",
    color: "",
    brand: "",
    location: "",
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    liked: false,
    favorite: false,
    data: new Date(),
    


});


        const [clothingItems, setClothingItems] = useState([]);
        const [images, setImages] = useState([]); // faylları saxlayır upload üçün
        const [preview, setPreview] = useState([]); // şəkillərin önizləmə URL-ləri
        const [editingId, setEditingId] = useState(null);


                 const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };




     const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setClothingPost((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else if (name === "data") {
      // tarix inputunu stringdən Date-ə çevirə bilərsən burada, lazım gələrsə
      setClothingPost((prev) => ({ ...prev, data: new Date(value) }));
    } else {
      setClothingPost((prev) => ({ ...prev, [name]: value }));
    }
  };



   const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Clothing/");
      setClothingItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };




   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // şəkilləri formData-ya əlavə et
    images.forEach((file) => formData.append("images", file));

    // digər sahələri əlavə et
    Object.entries(clothingPost).forEach(([key, value]) => {
      if (key === "images" || key === "data") return; // artıq əlavə edilib və ya handled olunur
      if (key === "contact") {
        Object.entries(value).forEach(([k, v]) =>
          formData.append(`contact.${k}`, v)
        );
      } else {
        formData.append(key, value);
      }
    });

    // tarix stringə çevrilmiş şəkildə əlavə et
    formData.append("data", clothingPost.data.toISOString());

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/Clothing/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/Clothing/", formData);
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };




    const resetForm = () => {
    setClothingPost({
      type: "",
    title: "",
    description: "",
    images: [],
    price: "",
    category: "",
    condition: "",
    size: "",
    color: "",
    brand: "",
    location: "",
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    liked: false,
    favorite: false,
    data: new Date(),
    });
    setImages([]);
    setPreview([]);
    setEditingId(null);
  };
   

 const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Clothing/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

 const handleFavorite = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/Clothing/${id}/favorite`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };


   const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/Clothing/${id}/like`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };


      const handleEdit = (item) => {
    setClothingPost({
      ...item,
      data: item.data ? new Date(item.data) : new Date(),
    });
    setEditingId(item._id);
    setPreview(item.images || []);
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
    
      // Saat:dəqiqə formatı
      const getCurrentTime = (isoString) => {
        const date = new Date(isoString);
        return date.toTimeString().split(" ")[0].slice(0, 5);
      };
    
      useEffect(() => {
        fetchItems();
      }, []);
  
  



       return (
         <div className="p-6 max-w-5xl mx-auto">
             <h2 className="text-2xl font-bold mb-4">Geyim Elanları</h2>
       
             <form
               onSubmit={handleSubmit}
               className="p-4 border-[1px] border-green-300/100 rounded w-full bg-[#ffffff] mb-10 grid grid-cols-2 gap-4"
             >
               <input
                 type="text"
                 name="type"
                 placeholder="Malın tipi"
                 value={clothingPost.type}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
               <input
                 type="text"
                 name="title"
                 placeholder="Başlıq"
                 value={clothingPost.title}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100  p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                required
               />
               <input
                 type="text"
                 name="description"
                 placeholder="Təsvir"
                 value={clothingPost.description}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                required
               />
               <input
                 type="text"
                 name="price"
                 placeholder="Qiymət"
                 value={clothingPost.price}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100  p-2 rounded capitalize   invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20  "
                 required
               />
               <input
                 type="text"
                 name="brand"
                 placeholder="Model"
                 value={clothingPost.brand}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
                 <input
                 type="text"
                 name="condition"
                 placeholder="Vəziyyəti"
                 value={clothingPost.condition}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
                 <input
                 type="text"
                 name="size"
                 placeholder="Ölçü"
                 value={clothingPost.size}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
                 <input
                 type="text"
                 name="color"
                 placeholder="Rəng"
                 value={clothingPost.color}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
      
               <input
                 type="text"
                 name="location"
                 placeholder="Yer"
                 value={clothingPost.location}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                 required
               />
       
               <input
                 type="text"
                 name="contact.name"
                 placeholder="Əlaqə Adı"
                 value={clothingPost.contact.name}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
               required
               />
               <input
                 type="email"
                 name="contact.email"
                 placeholder="Əlaqə Email"
                 value={clothingPost.contact.email}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                 required
                 />
               <input
                 type="tel"
                 name="contact.phone"
                 placeholder="Əlaqə Telefon"
                 value={clothingPost.contact.phone}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  required
               />
               <input
                 type="date"
                 name="data"
                 placeholder="Tarix"
                 value={clothingPost.data.toISOString().split("T")[0]}
                 onChange={handleChange}
                 className="border-[1px] border-green-300/100 p-2 rounded invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                  required
               />
       
               <div className="col-span-2">
                 <input
                   type="file"
                   name="images"
                   multiple
                   onChange={handleImageChange}
                   className="border-[1px] border-green-300/100 p-2 rounded  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " 
               required
               />
                 {preview.length > 0 && (
                   <div className="flex  gap-4 mt-4 flex-wrap">
                     {preview.map((src, idx) => (
                       <img
                         key={idx}
                         src={src}
                         alt={`preview-${idx}`}
                         className="w-32 h-32 object-cover border-[1px] border-green-300/100 rounded  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " 
                       />
                     ))}
                   </div>
                 )}
               </div>
       
               <button
                 type="submit"
                 className="col-span-2 bg-blue-600 border-[1px] border-green-300/100 text-white py-2 rounded hover:bg-blue-700  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " 
               >
                 {editingId ? "Yenilə" : "Əlavə et"}
               </button>
             </form>
       
             <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
             <div className="grid grid-cols-1 border-[1px] border-green-300/100 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#ffffff] p-4 rounded">
               {[...clothingItems].reverse().map((item) => (
                 <Link  key={item._id || item.id}   to={`/elan/${item._id}`}>
                   
                 <div
                   
                   className="flex flex-col max-w-[303.5px] h-[400px] p-4 shadow-md cursor-pointer rounded hover:shadow-xl transition-transform duration-200 ease-in-out bg-white"
                 >
                   
                     <div className="mb-4">
                       {item.images && item.images.length > 0 && (
                         <img
                           src={item.images[0]}
                           alt={item.title}
                           className="w-full h-48 object-cover object-contain rounded"
                         />
                       )}
                     </div>
                     <p className="text-lg font-bold truncate w-64">{item.price} AZN</p>
                     <p className="text-lg font-semibold truncate w-64" >{item.title}, {item.brand}</p>
                   
                     <p className="text-gray-700  truncate w-64">{item.description}</p>
                     <p className="text-gray-400 text-sm mt-1">
                       {/* Əlaqə: {item.contact.name} - {item.contact.email} -{" "} */}
                       {/* {item.contact.phone} */}
                     </p>
                     <p className="text-gray-500 text-sm mt-1">
                       {item.location}, {formatDate(item.data)}, {getCurrentTime(item.data)}
                     </p>
                   
                   <div className="mt-4 flex flex-wrap gap-2">
                     <button
                       onClick={() => handleEdit(item)}
                       className="bg-yellow-400 text-white px-3 py-1 rounded"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleDelete(item._id)}
                       className="bg-red-500 text-white px-3 py-1 rounded"
                     >
                       Delete
                     </button>
                     <button
                       onClick={() => handleLike(item._id)}
                       className={`px-3 py-1 rounded ${
                         item.liked ? "bg-green-600 text-white" : "bg-gray-300"
                       }`}
                     >
                       {item.liked ? "Liked ❤️" : "Like"}
                     </button>
                     <button
                       onClick={() => handleFavorite(item._id)}
                       className={`px-3 py-1 rounded ${
                         item.favorite ? "bg-purple-600 text-white" : "bg-gray-200"
                       }`}
                     >
                       {item.favorite ? "Favorit ⭐" : "Favorit"}
                     </button>
                   </div>
                 </div>
                 </Link>
               ))}
             </div>
           </div>
        );
}