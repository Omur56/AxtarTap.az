import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CreateClothing() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [clothingPost, setClothingPost] = useState({
    id: Date.now(),
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setClothingPost((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else if (name === "data") {
      setClothingPost((prev) => ({ ...prev, data: new Date(value) }));
    } else {
      setClothingPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Clothing/`);
      setClothingItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  images.forEach((file) => formData.append("images", file));

  Object.entries(clothingPost).forEach(([key, value]) => {
    if (key === "images" || key === "date") return;
    if (key === "contact") {
      Object.entries(value).forEach(([k, v]) =>
        formData.append(`contact.${k}`, v)
      );
    } else {
      formData.append(key, value);
    }
  });

  // date sahəsi undefined ola bilər, ona görə yoxla
  formData.append(
    "date",
    clothingPost.date ? clothingPost.date.toISOString() : new Date().toISOString()
  );

  // Token və userId əlavə et
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  formData.append("userId", userId);

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (editingId) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/Clothing/${editingId}`,
        formData,
        config
      );
      setEditingId(null);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/Clothing/`, formData, config);
      Swal.fire({
        icon: "success",
        title: "Elanınız uğurla yerləşdirildi!",
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
      text: err.response?.data?.error || "Server xətası",
      confirmButtonColor: "#d33",
    });
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/Clothing/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/Clothing/${id}/favorite`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/Clothing/${id}/like`);
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

  const apiUrls = [`${process.env.REACT_APP_API_URL}/api/Clothing`];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const requests = apiUrls.map((url) => axios.get(url));
      const responses = await Promise.all(requests);

      let allData = [];
      responses.forEach((res) => {
        if (Array.isArray(res.data)) allData = allData.concat(res.data);
      });

      const filtered = allData.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const brand = item.brand?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";
        const model = item.model?.toLowerCase() || "";
        const type_of_gods = item.type_of_gods?.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const city = item.city?.toLowerCase() || "";
        const engine = item.engine?.toLowerCase() || "";
        const year = item.year?.toLowerCase() || "";
        const motor = item.motor?.toLowerCase() || "";
        const transmission = item.transmission?.toLowerCase() || "";
        const ban_type = item.ban_type?.toLowerCase() || "";
        const price = item.price?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        return (
          title.includes(query.toLowerCase()) ||
          brand.includes(query.toLowerCase()) ||
          category.includes(query.toLowerCase()) ||
          location.includes(query.toLowerCase()) ||
          model.includes(query.toLowerCase()) ||
          city.includes(query.toLowerCase()) ||
          engine.includes(query.toLowerCase()) ||
          year.includes(query.toLowerCase()) ||
          motor.includes(query.toLowerCase()) ||
          transmission.includes(query.toLowerCase()) ||
          ban_type.includes(query.toLowerCase()) ||
          price.includes(query.toLowerCase()) ||
          description.includes(query.toLowerCase())
        );
        type_of_gods.includes(query.toLowerCase());
      });

      setResults(filtered);
    } catch (error) {
      console.error("API axtarış xətası:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [clothing, setClothing] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [clothing] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/Clothing`),
        ]);

        setClothing(clothing.data);
      } catch (err) {
        console.error("API xətası:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);


  const token = localStorage.getItem("token");

// Yeni funksiyanı elanı açan buttona əlavə edirik
const handleOpenForm = () => {
  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Giriş tələb olunur",
      text: "Elan paylaşmaq üçün hesabınıza daxil olun.",
      confirmButtonColor: "#3085d6",
    });
    return;
  }
  setIsOpen(true);
};
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded bg-green-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-blue-700 focus:shadow-none active:bg-slate-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Axtar
            </button>
          </div>
        </div>
        <Link to="/">
          
          <button className="flex mb-4 mt-4 items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
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
        <h2 className="text-2xl font-bold mb-4">Geyim Elanları</h2>
        <div className="p-4">
          <button
            onClick={handleOpenForm}
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
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-4 p-2"
                >
                  <input
                    type="text"
                    name="type"
                    placeholder="Malın tipi"
                    value={clothingPost.type}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Başlıq"
                    value={clothingPost.title}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100  p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Təsvir"
                    value={clothingPost.description}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder="Qiymət"
                    value={clothingPost.price}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100  p-2 rounded-[10px] capitalize   invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20  "
                    required
                  />
                  <input
                    type="text"
                    name="brand"
                    placeholder="Model"
                    value={clothingPost.brand}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="condition"
                    placeholder="Vəziyyəti"
                    value={clothingPost.condition}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="size"
                    placeholder="Ölçü"
                    value={clothingPost.size}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="text"
                    name="color"
                    placeholder="Rəng"
                    value={clothingPost.color}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Yer"
                    value={clothingPost.location}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />

                  <input
                    type="text"
                    name="contact.name"
                    placeholder="Əlaqə Adı"
                    value={clothingPost.contact.name}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] capitalize invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="email"
                    name="contact.email"
                    placeholder="Əlaqə Email"
                    value={clothingPost.contact.email}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />
                  <input
                    type="tel"
                    name="contact.phone"
                    placeholder="Əlaqə Telefon"
                    value={clothingPost.contact.phone}
                    onChange={handleChange}
                    className="border-[1px] border-green-300/100 p-2 rounded-[10px] invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                    required
                  />

                  <div className="col-span-2">
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={handleImageChange}
                      className="border-[1px] border-green-300/100 p-2 rounded-[10px]  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                      required
                    />
                    {preview.length > 0 && (
                      <div className="flex  gap-4 mt-4 flex-wrap">
                        {preview.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            className="w-32 h-32 object-cover border-[1px] border-green-300/100 rounded-[10px]  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="col-span-2 bg-blue-600 border-[1px] border-green-300/100 text-white py-2 rounded-[10px] hover:bg-blue-700  invalid:border-red-500 invalid:text-red-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 "
                  >
                    {editingId ? "Yenilə" : "Əlavə et"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {loading && <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
          {loading && results.length === 0 && (
            <div class="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-100 to-violet-200">
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
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((item, index) => (
                <Link
                  key={item.id || item._id}
                  to={`/item/${item._id} || ${item.id}`}
                >
                  <div
                    key={index}
                    className="border w-[226px] h-[304px] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : item.imageUrls && item.imageUrls.length > 0
                          ? item.imageUrls[0]
                          : "/placeholder.png"
                      }
                      alt={item.title || "Image"}
                      className="w-full h-[171px] object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-1">
                        {item.price} AZN
                      </h2>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title} {item.category} {item.type}{" "}
                      </h3>
                      <p className="text-gray-600">{item.brand}</p>
                      <p className="text-gray-600">{item.model}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.location}, {formatDate(item.data)},{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className=" ring-2 w-full my-4"></div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
        <div className="rounded-2xl grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[226px] h-[304px] bg-white rounded-2xl shadow-md  flex flex-col overflow-hidden relative"
              >
                <div className="w-full h-[171px] rounded-t-[8px] mb-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>

                <div className="p-4">
                  <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-3/4 animate-shimmer"></div>

                  <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-full animate-shimmer"></div>

                  <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-2/3 animate-shimmer"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {[...clothingItems].reverse().map((item) => (
                <Link
                target="_blank"
            rel="noopener noreferrer"
                  key={item._id || item.id}
                  to={`/PostDetailClothing/${item._id}`}
                >
                  <div className="flex flex-col w-[226px] h-[304px]  shadow-md cursor-pointer rounded-2xl hover:shadow-xl transition-transform duration-200 ease-in-out bg-white">
                    <div className="">
                      {item.images && item.images.length > 0 && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-[171px] object-cover object-contain rounded-t-2xl"
                        />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-lg font-bold truncate w-62">
                        {item.price} AZN
                      </p>
                      <p className="text-lg font-semibold truncate w-62">
                        {item.title}, {item.brand}
                      </p>
                      <p className="text-gray-500 text-sm mt-8">
                        {item.location}, {formatDate(item.data)},{" "}
                        {getCurrentTime(item.data)}
                      </p>
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
