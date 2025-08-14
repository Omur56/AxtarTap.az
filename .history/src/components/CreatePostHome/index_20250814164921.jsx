import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreatePostForHomeAndGarden() {
  const [homGardenForm, setHomGardenForm] = useState({
    category: "",
    title: "",
    description: "",
    brand: "",
    price: "",
    location: "",
    contact: { name: "", email: "", phone: "" },
    liked: false,
    favorite: false,
    data: new Date(),
  });

  const [homGardenItems, setHomGardenItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Şəkil seçimi
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Form inputları
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setHomGardenForm((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else {
      setHomGardenForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Backenddən elanları gətirmək
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/homGarden/");
      setHomGardenItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit (əlavə et / yenilə)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(homGardenForm).forEach(([key, value]) => {
      if (key === "data") {
        formData.append("data", value.toISOString());
      } else if (key === "contact") {
        Object.entries(value).forEach(([k, v]) =>
          formData.append(`contact.${k}`, v)
        );
      } else {
        formData.append(key, value);
      }
    });

    // Çoxlu şəkilləri FormData-ya əlavə et
    images.forEach((file) => formData.append("images", file));

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/homGarden/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/homGarden", formData);
      }

      // Form və şəkilləri sıfırla
      setHomGardenForm({
        category: "",
        title: "",
        description: "",
        brand: "",
        price: "",
        location: "",
        contact: { name: "", email: "", phone: "" },
        liked: false,
        favorite: false,
        data: new Date(),
      });
      setImages([]);
      setPreview([]);
      fetchItems();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/homGarden/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setHomGardenForm({
      category: item.category || "",
      title: item.title || "",
      description: item.description || "",
      brand: item.brand || "",
      price: item.price || "",
      location: item.location || "",
      contact: item.contact || { name: "", email: "", phone: "" },
      liked: item.liked || false,
      favorite: item.favorite || false,
      data: item.data ? new Date(item.data) : new Date(),
    });
    setEditingId(item._id);
    // Əvvəlki şəkilləri preview-da göstər
    setPreview(item.images || []);
  };

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

  // Tarix formatı
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ev və Bağ Elanı</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mb-10 grid grid-cols-2 gap-4 border rounded bg-white"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={homGardenForm.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={homGardenForm.description}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={homGardenForm.brand}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={homGardenForm.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={homGardenForm.location}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="contact.name"
          placeholder="Contact Name"
          value={homGardenForm.contact.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="contact.email"
          placeholder="Contact Email"
          value={homGardenForm.contact.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="contact.phone"
          placeholder="Contact Phone"
          value={homGardenForm.contact.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        {/* Şəkil yükləmə */}
        <div className="col-span-2 flex flex-col gap-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-64"
          />

          {preview.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 rounded mt-4"
        >
          {editingId ? "Yenilə" : "Əlavə et"}
        </button>
      </form>

      {/* KARTLAR */}
      <h3 className="text-xl font-semibold mb-4">Əlavə olunan Elanlar</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {homGardenItems.map((item) => (
          <Link key={item._id} to={`/elan/${item._id}`}>
            <div className="flex flex-col p-4 shadow-md rounded bg-white hover:shadow-xl">
              {item.images && item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t"
                />
              )}
              <p className="text-lg font-bold">{item.price} AZN</p>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-400 text-sm">
                Əlaqə: {item.contact?.name || "Naməlum"} -{" "}
                {item.contact?.email || "Naməlum"} -{" "}
                {item.contact?.phone || "Naməlum"}
              </p>
              <p className="text-gray-500 text-sm">
                {item.location}, {formatDate(item.data)}, {getCurrentTime(item.data)}
              </p>

              <div className="mt-2 flex gap-2 flex-wrap">
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
