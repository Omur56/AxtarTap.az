import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateRealEstate() {
  const [realEstatePost, setRealEstatePost] = useState({
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

  // Çoxlu şəkil seçmə
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Input dəyişmə
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

  // Backend-dən elanları çək
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/realEstate/");
      setRealEstateList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Form-u sıfırla
  const resetForm = () => {
    setRealEstatePost({
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

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Şəkilləri əlavə et
    images.forEach((file) => formData.append("images", file));

    // Digər sahələri əlavə et
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
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Elanı sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/realEstate/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Favorit
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Ən Son Daşınmaz Əmlak Elanları
      </h2>
      <form onSubmit={handleSubmit} className="p-4 border-[1px] border-green-300/100 rounded w-full bg-[#ffffff] mb-10 grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title_type"
          value={realEstatePost.title_type}
          onChange={handleInputChange}
          placeholder="Elanın adı"
          className=" border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="type_building"
          value={realEstatePost.type_building}
          onChange={handleInputChange}
          placeholder="Elanın tipi"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="field"
          value={realEstatePost.field}
          onChange={handleInputChange}
          placeholder="Elanın bölməsi"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="number_of_rooms"
          value={realEstatePost.number_of_rooms}
          onChange={handleInputChange}
          placeholder="Otaq sayı"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="location"
          value={realEstatePost.location}
          onChange={handleInputChange}
          placeholder="Lokasiya"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="city"
          value={realEstatePost.city}
          onChange={handleInputChange}
          placeholder="Şəhər"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="price"
          value={realEstatePost.price}
          onChange={handleInputChange}
          placeholder="Qiymət"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="description"
          value={realEstatePost.description}
          onChange={handleInputChange}
          placeholder="Təsvir"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="date"
          name="data"
          value={
            realEstatePost.data
              ? new Date(realEstatePost.data).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="contact.name"
          value={realEstatePost.contact.name}
          onChange={handleInputChange}
          placeholder="İstifadəçi adı"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="email"
          name="contact.email"
          value={realEstatePost.contact.email}
          onChange={handleInputChange}
          placeholder="İstifadəçi emaili"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />
        <input
          type="text"
          name="contact.phone"
          value={realEstatePost.contact.phone}
          onChange={handleInputChange}
          placeholder="İstifadəçi telefon nömrəsi"
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />

        {/* Çoxlu şəkil yükləmə */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        />

        {/* Önizləmə */}
        {preview.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="border-[1px] border-green-300/100 p-2 rounded capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="col-span-2 bg-blue-600 border-[1px] border-green-300/100 text-white py-2 rounded hover:bg-blue-700  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
        >
          {editingId ? "Elanı yenilə" : "Elanı əlavə et"}
        </button>
      </form>

      
      <div className="p-4 border-[1px] border-green-300/100 p-4  rounded-[8px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  w-full  bg-[#ffffff]">
        {[...realEstateList].reverse().map((item) => (

          <div key={item._id} className=" flex flex-col p-4    shadow-md cursor-pointer bg-[#ffffff] rounded-[8px]  hover:shadow-xl hover:scale-5 transition duration-50 ease-in-out">
               {item.images && item.images.length > 0 && (
              <div className="flex gap-2  rounded-t-sm">
                {item.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-[178.75px]
                 object-contain object-cover rounded-t-[8px]"
                  />
                ))}
              </div>
            )}
           
            <h2 className="text-lg font-bold">{item.price} AZN</h2>
            <h4 className="font-sans capitalize text-[18px] line-clamp-1">{item.title_type}</h4>
            <p className="capitalize text-[14px] font-sans font-[500] leading-tight">{item.description}</p>
            {/* <p className="">{item.type_building}</p>
            <p className="">{item.field}</p> */}
            <p className="">Otaq sayı: {item.number_of_rooms}</p>
           
            {/* <p className="">{item.city}</p> */}
            <p className="">{item.contact?.name} {item.contact?.email} {item.contact?.phone}</p>
            

            {/* Backend-dən gələn şəkillər */}
         

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleLike(item._id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                {item.contact?.liked ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => handleFavorite(item._id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                {item.contact?.favorite ? "Favorited" : "Favorite"}
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Dəyiş
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Sil
              </button>
            </div>
             <p className="capitalize text-gray-400 text-[16px]">{item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}</p>
            </div>
          
        ))}
      </div>
    </div>
  );
}
