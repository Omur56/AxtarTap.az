import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { X } from "lucide-react";
import Swal from "sweetalert2";

export default function CreateHousehold() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [household, setHousehold] = useState({
    category: "",
    title: "",
    description: "",
    type_of_goods: "",
    location: "",
    price: "",
    liked: false,
    favorite: false,
    data: new Date(),
    contact: { name: "", email: "", phone: "" },
  });

  const [householdItems, setHouseholdItems] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setHousehold((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    } else if (name === "data") {
      setHousehold((prev) => ({ ...prev, data: new Date(value) }));
    } else {
      setHousehold((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Household");
      setHouseholdItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    Object.entries(household).forEach(([key, value]) => {
      if (key === "images" || key === "data") return;
      if (key === "contact") Object.entries(value).forEach(([k, v]) => formData.append(`contact.${k}`, v));
      else formData.append(key, value);
    });
    formData.append("data", household.data.toISOString());

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/Household/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/Household", formData);
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
        text: err.response?.data?.message || "Server xətası",
        confirmButtonColor: "#d33",
      });
    }
  };

  const resetForm = () => {
    setHousehold({
      category: "",
      title: "",
      description: "",
      type_of_goods: "",
      location: "",
      price: "",
      liked: false,
      favorite: false,
      data: new Date(),
      contact: { name: "", email: "", phone: "" },
    });
    setImages([]);
    setPreview([]);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setHousehold({ ...item, data: item.data ? new Date(item.data) : new Date() });
    setEditingId(item._id);
    setPreview(item.images || []);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Household/${id}`);
      fetchItems();
    } catch (err) { console.error(err); }
  };

  const handleLike = async (id) => { await axios.patch(`http://localhost:5000/api/Household/${id}/like`); fetchItems(); };
  const handleFavorite = async (id) => { await axios.patch(`http://localhost:5000/api/Household/${id}/favorite`); fetchItems(); };
  const handleImageDelete = async (imageName) => { await axios.delete(`http://localhost:5000/api/Household/images/${imageName}`); fetchItems(); };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "bugün";
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "dünən";
    return date.toLocaleDateString("az-AZ", { day: "numeric", month: "long", year: "numeric" });
  };

  const getCurrentTime = (isoStr) => new Date(isoStr).toTimeString().split(" ")[0].slice(0, 5);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/Household");
      const filtered = res.data.filter((item) =>
        Object.values(item).some(val =>
          typeof val === "string" && val.toLowerCase().includes(query.toLowerCase())
        ) ||
        Object.values(item.contact || {}).some(val =>
          typeof val === "string" && val.toLowerCase().includes(query.toLowerCase())
        )
      );
      setResults(filtered);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try { const res = await axios.get("http://localhost:5000/api/Household"); setHouseholdItems(res.data); }
      catch (err) { console.error(err); }
      finally { setIsLoading(false); }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      {/* Axtarış input */}
      <div className="w-full max-w-[700px] mx-auto relative mb-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="AxtarTap..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="absolute right-2 top-1 bg-green-500 px-2 py-1 text-white rounded"
          onClick={handleSearch}
        >Axtar</button>
      </div>

      <button onClick={() => setIsOpen(true)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">Elan yerləşdirmək</button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-xl shadow-lg">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-red-600"><X size={28}/></button>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input type="text" name="category" placeholder="Kateqoriya" value={household.category} onChange={handleChange} required />
              <input type="text" name="title" placeholder="Başlıq" value={household.title} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Təsvir" value={household.description} onChange={handleChange} required />
              <input type="text" name="type_of_goods" placeholder="Marka" value={household.type_of_goods} onChange={handleChange} required />
              <input type="text" name="price" placeholder="Qiymət" value={household.price} onChange={handleChange} required />
              <input type="text" name="location" placeholder="Yer" value={household.location} onChange={handleChange} required />
              <input type="text" name="contact.name" placeholder="Əlaqə Adı" value={household.contact.name} onChange={handleChange} required />
              <input type="email" name="contact.email" placeholder="Əlaqə Email" value={household.contact.email} onChange={handleChange} required />
              <input type="tel" name="contact.phone" placeholder="Əlaqə Telefon" value={household.contact.phone} onChange={handleChange} required />
              <div className="col-span-2">
                <input type="file" name="images" multiple onChange={handleImageChange} required />
                <div className="flex gap-4 mt-2 flex-wrap">
                  {preview.map((src, idx) => <img key={idx} src={src} className="w-32 h-32 object-cover" />)}
                </div>
              </div>
              <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">{editingId ? "Yenilə" : "Əlavə et"}</button>
            </form>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>)
          : [...householdItems].reverse().map((item) => (
            <Link key={item._id} to={`/PostDetailHousehold/${item._id}`}>
              <div className="flex flex-col shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
                <img src={item.images?.[0] || "/placeholder.png"} className="w-full h-48 object-cover" />
                <div className="p-2">
                  <h3 className="font-bold">{item.price} AZN</h3>
                  <p className="truncate">{item.category} "{item.title}" {item.type_of_goods}</p>
                  <p className="text-gray-500 text-sm">{item.location}, {formatDate(item.data)}, {getCurrentTime(item.data)}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
