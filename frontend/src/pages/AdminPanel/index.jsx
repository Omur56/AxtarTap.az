import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ title: "", link: "", image: null });
  const [stats, setStats] = useState({ posts: 0, users: 0 });
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  // əgər token yoxdursa -> login səhifəsinə yönləndir
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  // axios-a header əlavə et
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const statsRes = await axiosInstance.get("/stats");
        setStats(statsRes.data);

        const adsRes = await axiosInstance.get("/ads");
        setAds(adsRes.data);
      } catch (err) {
        console.error("Xəta:", err);
        if (err.response?.status === 403) {
          navigate("/admin/login");
        }
      }
    }
    fetchData();
  }, [navigate]);

  // Reklam əlavə et
  const handleAddAd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAd.title);
    formData.append("link", newAd.link);
    formData.append("image", newAd.image);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/ads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Reklam əlavə olundu ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // Reklam sil
  const handleDeleteAd = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/ads/${id}`);
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error("Reklam silərkən xəta:", err);
    }
  };

  // Çıxış funksiyası
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="p-6 max-w-[1000px] min-h-screen mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Çıxış
        </button>
      </div>

      {/* Statistikalar */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Elanlar</h2>
          <p className="text-2xl">{stats.posts}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">İstifadəçilər</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
      </div>

      {/* Reklam əlavə et */}
      <form
        onSubmit={handleAddAd}
        className="p-4 bg-gray-100 rounded-lg shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Yeni Reklam Əlavə Et</h2>
        <input
          type="text"
          placeholder="Başlıq"
          className="w-full p-2 border rounded mb-2"
          value={newAd.title}
          onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          className="w-full p-2 border rounded mb-2"
          value={newAd.link}
          onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
        />
        <input
          type="file"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewAd({ ...newAd, image: e.target.files[0] })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Əlavə Et
        </button>
      </form>

      {/* Reklam siyahısı */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mövcud Reklamlar</h2>
        <div className="grid grid-cols-3 gap-4">
          {[...ads].reverse().map((ad) => (
            <div key={ad._id} className="p-4 bg-white rounded-lg shadow">
              <img
                src={`${process.env.REACT_APP_API_URL}/${ad.image}`}
                alt={ad.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <div className="flex justify-between">
                <div className="grid grid-col-1 sm:grid-col-2">
                  <h3 className="font-semibold">{ad.title}</h3>
                  <Link
                    href={ad.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 text-sm truncate w-10 "
                  >
                    Link Click
                  </Link>
                </div>
                <button
                  onClick={() => handleDeleteAd(ad._id)}
                  className="bg-red-600 text-white px-3 py-1 mt-2 rounded text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
