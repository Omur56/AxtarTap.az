import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateAccessoryPost(){
    const [accessory, setAccessory] = useState({
    title: "",
    brand: "",
    model: "",
    price: "",
    location: "",
    images: [], // çoxlu şəkil üçün array
    description: "",
    contact: { name: "", email: "", phone: "" },
    liked: false,
    favorite: false,
    data: new Date(),
    });



    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [accessoryItems, setAccessoryItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [images, setImages] = useState([]); // faylları saxlayır upload üçün
   const [imageLoading, setImageLoading] = useState(false);


const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...files.map(file => URL.createObjectURL(file))]);
};

const handleChange = (e) => {
   const {name, value} = e.target;
   if (name.startsWith("contact.")) {
       const field = name.split(".")[1];
       setAccessory((prev) => ({
           ...prev,
           contact: { ...prev.contact, [field]: value },
       }));
   } else if (name === "data") {
       // tarix inputunu stringdən Date-ə çevirə bilərsən burada, lazım gələrsə
       setAccessory((prev) => ({ ...prev, data: new Date(value) }));
   } else {
       setAccessory((prev) => ({ ...prev, [name]: value }));
   }
};


const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/accessories");
      setAccessoryItems(response.data);
    } catch (error) {
      console.error("Error fetching accessory items:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

     const formData = new FormData();

     images.forEach((file) => formData.append("images", file));


     Object.entries(accessory).forEach(([key, value]) => {
         if (key === "images" || key === "data") return; // artıq əlavə edilib və ya handled olunur
         if (key === "contact") {
             Object.entries(value).forEach(([k, v]) =>
                 formData.append(`contact.${k}`, v)
             );
         } else {
             formData.append(key, value);
         }
     });

     formData.append("data", accessory.data.toISOString());

try {
    if (editingId) {
        const response = await axios.put(
            `http://localhost:5000/api/accessories/${editingId}`,
            formData
        );
        setEditingId(null);
    }else {
        await axios.post("http://localhost:5000/api/accessories", formData);
    }
        resetForm();
        fetchItems();
}catch (err) {
    console.error(err);
}

  };


  const resetForm = () => {
    setAccessory({
        title: "",
        name: "",
        brand: "",
        model: "",
        price: "",
        location: "",
        images: [],
        description: "",
        contact: { name: "", email: "", phone: "" },
        liked: false,
        favorite: false,
        data: new Date(),
    })
    setImages([]);
    setPreview([]);
    setEditingId(null);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/accessories/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
        

  const handleFavorite = async (id) => {
    try {
        await axios.patch(`http://localhost:5000/api/accessories/${id}/favorite`);
        fetchItems();
    } catch (err) {
        console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
        await axios.patch(`http://localhost:5000/api/accessories/${id}/like`);
        fetchItems();
    } catch (err) {
        console.error(err);
    }
  };


  const handleEdit = (item) => {
    setAccessory({
        ...item,
        data: item.data ? new Date(item.data) : new Date(),
    })
    setEditingId(item._id);
    setPreview(item.images || []);
  };

  const handleImageDelete = async (image) => {
    try {
      await axios.delete(`http://localhost:5000/api/accessories/images/${image}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
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

     return postDate.toLocaleDateString("az-AZ",{
        day: "numeric",
        month: "long",
        year: "numeric",
     });
  };

  const getCurrentTime = (isoString) => {
    const date = new Date(isoString);
    return date.toTimeString().split(" ")[0].slice(0, 5);
  }

  useEffect(() => {
    fetchItems();
  },[])


  return (
    <div className=" p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ehtiyyat hissələri və aksesuarlar Elanları</h2>

        <form onSubmit={handleSubmit} className="p-4 border-[1px] border-green-300/100 rounded w-full bg-[#ffffff] mb-10 grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Başlıq"
          value={accessory.title}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Təsvir"
          value={accessory.description}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Marka"
          value={accessory.brand}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Qiymət"
          value={accessory.price}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />
 <input
          type="text"
          name="model"
          placeholder="Model"
          value={accessory.model}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

          <input
          type="text"
          name="location"
          placeholder="Yer"
          value={accessory.location}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

          <input
          type="text"
          name="contact.name"
          placeholder="Əlaqə Adı"
          value={accessory.contact.name}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

        <input
          type="email"
          name="contact.email"
          placeholder="Əlaqə Email"
          value={accessory.contact.email}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

        <input
          type="tel"
          name="contact.phone"
          placeholder="Əlaqə Telefon"
          value={accessory.contact.phone}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
          required
        />

         <input
          type="date"
          name="data"
          placeholder="Tarix"
          value={accessory.data.toISOString().split("T")[0]}
          onChange={handleChange}
          className="border-[1px] border-green-300/100 p-2 rounded  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " 
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
            <div className="flex gap-4 mt-4 flex-wrap">
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
          className="col-span-2 bg-blue-600 border-[1px] border-green-300/100 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Yenilə" : "Əlavə et"}
        </button>
        </form>

        <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
        <div className="grid  grid-cols-1 border-[1px] border-green-300/100 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#ffffff] p-4 rounded">
        {[...accessoryItems].reverse().map((item) => (
            <Link  key={item._id || item.id}   to={`/elan/${item._id}`}>
          <div
            key={item._id || item.id}
            className="flex flex-col w-full h-full p-4 shadow-md cursor-pointer rounded hover:shadow-xl transition-transform duration-200 ease-in-out bg-white"
          >
            
              <div className="mb-4">
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover object-contain  rounded"
                  />
                )}
              </div>
              <p className="text-lg font-bold">{item.price} AZN</p>
              <h4 className="text-lg font-semibold truncate w-64">{item.title}</h4>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-400 text-sm mt-1">
                Əlaqə: {item.contact.name} - {item.contact.email} -{" "}
                {item.contact.phone}
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
