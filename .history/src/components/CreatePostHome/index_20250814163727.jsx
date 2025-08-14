import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, Link } from "react-router-dom";


export default function CreatePostForHomeAndGarden() {
  const [homGardenForm, setHomGardenForm] = useState({
    category: "",
    title: "",
    description: "",
    brand: "",
    price: "",
    image: "",
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

  const [homGardenItems, setHomGardenItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);




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
      setHomGardenForm((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }));
    } else {
      setHomGardenForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setHomGardenForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/homGarden/");
      setHomGardenItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(homGardenForm).forEach(([key, value]) => {
      if (key === "image") {
        formData.append("image", value);
      } else if (key === "data") {
        formData.append("data", value.toISOString());
      } else if (key === "contact") {
        Object.entries(value).forEach(([k, v]) => formData.append(`contact.${k}`, v));
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/homGarden/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/homGarden", formData);
       
      }
      setHomGardenForm({
        id: Date.now(),
        category: "",
        title: "",
        description: "",
        brand: "",
        price: "",
        image: [],
        location: "",
        contact: { name: "", email: "", phone: "" },
        liked: false,
        favorite: false,
        data: new Date(),
      });
      fetchItems();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/homGarden/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // const handleEdit = (item) => {
  //   setHomGardenForm(item);
  //   setEditingId(item._id);

  // };

const handleEdit = (item) => {
  setHomGardenForm({
    ...item,
    contact: item.contact || { name: "", email: "", phone: "",  },
    data: item.data ? new Date(item.data) : new Date(),
     category: "",
        title: "",
        description: "",
        brand: "",
        price: "",
        image: "",
        location: "",

  });
  setEditingId(item._id);
};

const currentTime = new Date();



  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/homGarden/${id}/like`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/homGarden/${id}/favorite`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
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
  const date= new Date(isoString);
 
  const time = date.toTimeString().split(" ")[0].slice(0,5)
  return time;
};


  return (
    <div className="p-6 max-w-5xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Ev və Bağ Elanı</h2>
      <form
        onSubmit={handleSubmit}
        className=" p-4 border-[1px] border-green-300/100 p-4  rounded-[8px] w-full bg-[#ffffff] p-6 mb-10 grid grid-cols-2 gap-4"
      >
        <input type="text" name="title" placeholder="Title" value={homGardenForm.title} onChange={handleChange} className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="text" name="description" placeholder="Description" value={homGardenForm.description} onChange={handleChange} className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="text" name="brand" placeholder="Brand" value={homGardenForm.brand} onChange={handleChange} className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="text" name="price" placeholder="Price" value={homGardenForm.price} onChange={handleChange} className="border-[1px] border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <div className=" gap-4 flex flex-col ">
      
        {homGardenForm.image && (
          <img
            src={URL.createObjectURL(homGardenForm.image)}
            alt="Selected"
            className="w-32 h-32 object-cover rounded" required
          />
        )}
       

       <input
        type="file"
        multiple
        accept="image/*" 
        onChange={handleImageChange}
        className="border-[1px] border-green-300/100 w-[150px] p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required
      />

      {preview.length > 0 && (
        <div className="flex gap-4 mt-4">
          {preview.slice(0, 1).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="preview"
              className="w-32 h-32 object-cover rounded capitalize"
            />
          ))}
        </div>
      )}

        
       
        </div>
        <input type="text" name="location" placeholder="Location" value={homGardenForm.location} onChange={handleChange} className="border-[1px]  border-green-300/100 p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="text" name="contact.name" placeholder="Contact Name" value={homGardenForm.contact.name} onChange={handleChange} className="border-[1px] border-green-300/100  p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="email" name="contact.email" placeholder="Contact Email" value={homGardenForm.contact.email} onChange={handleChange} className="border-[1px] border-green-300/100  p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <input type="number" name="contact.phone" placeholder="Contact Phone" value={homGardenForm.contact.phone} onChange={handleChange} className="border-[1px] border-green-300/100   p-2 rounded capitalize  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 " required/>
        <button type="submit" className="col-span-2 border-[1px]  border-green-700/100 text-white bg-[#11B719] py-2 rounded hover:bg-blue-700" required>
          {editingId ? "Yenilə" : "Əlavə et"} 
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
      <div className="p-4 border-[1px] border-green-300/100  rounded-[8px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  w-full  bg-[#ffffff]">
        {[...homGardenItems].map((item) => (
          <Link  key={item._id || item.id}   to={`/elan/${item._id}`}>
          <div key={item._id || item.id} className="  flex flex-col p-4    shadow-md cursor-pointer bg-[#ffffff] rounded-[8px]  hover:shadow-xl hover:scale-5 transition duration-50 ease-in-out">
            <div className="flex gap-2  rounded-t-sm ">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[178.75px]
                 object-cover object-contain  rounded-t-[8px] "
              />
            )}
            </div>
            <p className="text-lg font-bold">{item.price} AZN</p>
            <h4 className="text-lg font-semibold font-[500]">{item.title}</h4>
            <p className="text-gray-700">{item.description}</p>
           
            {/* <p className="capitalize text-gray-400 text-[16px]">Əlaqə: {item.contact.name} - {item.contact.email} - {item.contact.phone}</p> */}
            <p className="capitalize text-gray-400 text-[16px]">Əlaqə: {item.contact?.name || "Naməlum"} - {item.contact?.email || "Naməlum"} - {item.contact?.phone || "Naməlum"}</p>
             <p className="text-sm text-gray-500">{item.location},   {formatDate(item.data)}, {getCurrentTime(item.data)} </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button  onClick={() => handleEdit(item._id)} className="bg-yellow-400 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
              <button onClick={() => handleLike(item._id)} className={`px-3 py-1 rounded ${item.liked ? "bg-green-600" : "bg-gray-300"}`}>
                {item.liked ? "Liked ❤️" : "Like"}
              </button>
              <button onClick={() => handleFavorite(item._id)} className={`px-3 py-1 rounded ${item.favorite ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
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


