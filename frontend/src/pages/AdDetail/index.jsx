import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { X } from "lucide-react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate} from 'react-router-dom';

export default function AdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [allAds, setAllAds] = useState([]);
  const [zoomIndex, setZoomIndex] = useState(null);

  const navigate = useNavigate();
// Hal-hazırki istifadəçi məlumatını əldə et (token və ya userId)
const currentUserId = localStorage.getItem("userId"); // backend-də istifadəçi id saxlanılırsa
  // Progress bar states
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  // Fetch all ads for bənzər elanlar
  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllAds(res.data.filter(a => a._id !== id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllAds();
  }, [id]);

  // Fetch single ad
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const selectedAd = res.data.find(a => a._id === id);
        if (!selectedAd) {
          setNotFound(true);
        } else {
          setAd(selectedAd);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  // Silmə funksiyası
const handleDelete = async () => {
  if (!window.confirm("Bu elanı silmək istədiyinizdən əminsiniz?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/my-announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Elan uğurla silindi!");
    navigate("/profile"); // silindikdən sonra profile-ə yönləndir
  } catch (err) {
    console.error("Elan silinmədi:", err);
    alert("Elan silinərkən xəta baş verdi!");
  }
};

  // Progress bar logic
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(prev => prev + 1);
        setBuffer(prev => (prev < 100 ? prev + 1 + Math.random() * 10 : 100));
      }
    };
  });
  React.useEffect(() => {
    const timer = setInterval(() => progressRef.current(), 100);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Box className="min-h-screen mt-12" sx={{ width: '100%' }}>
    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
  </Box>;

  if (notFound || !ad) return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-100 to-violet-200">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Elan Yüklənmədi
      </div>
      <Link to="/" className="mt-5 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">Əsas səhifə</Link>
    </div>
  );

  const imageArray = Array.isArray(ad.images) ? ad.images : ad.images ? [ad.images] : [];

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.setHours(0,0,0,0) - postDate.setHours(0,0,0,0);
    const oneDay = 24 * 60 * 60 * 1000;
    if (diffTime === 0) return "bugün";
    if (diffTime === oneDay) return "dünən";
    return postDate.toLocaleDateString("az-AZ", { day: "numeric", month: "long", year: "numeric" });
  };

  const getCurrentTime = (isoString) => new Date(isoString).toTimeString().slice(0,5);

  const openZoom = (index) => setZoomIndex(index);
  const closeZoom = () => setZoomIndex(null);
  const prevImage = () => setZoomIndex(prev => prev === 0 ? imageArray.length - 1 : prev - 1);
  const nextImage = () => setZoomIndex(prev => prev === imageArray.length - 1 ? 0 : prev + 1);

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-4">
      <Link to="/profile" className="flex items-center gap-2 mt-4 mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
        ← Geri
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-xl p-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4 capitalize">{ad.category} {ad.brand} {ad.model}</h1>
          <Carousel showThumbs showStatus={false} autoPlay infiniteLoop>
            {imageArray.map((img, index) => (
              <div key={index} className="w-full h-[400px] cursor-pointer" onClick={() => openZoom(index)}>
                <img
                  src={img.startsWith("http") ? img : `${process.env.REACT_APP_API_URL}/uploads/${img}`}
                  alt={`Şəkil ${index+1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Carousel>

          <p className="text-3xl font-bold mt-4 text-black">{ad.price} AZN</p>

          <ul className="text-sm text-gray-700 space-y-1 mt-4">
            {ad.ban_type && <li><span className="font-bold">Ban:</span> {ad.ban_type}</li>}
            {ad.year && <li><span className="font-bold">İl:</span> {ad.year}</li>}
            {ad.km && <li><span className="font-bold">Yürüş:</span> {ad.km} km</li>}
            {ad.motor && <li><span className="font-bold">Motor:</span> {ad.motor}</li>}
            {ad.engine && <li><span className="font-bold">Mühərrik növü:</span> {ad.engine}</li>}
            {ad.transmission && <li><span className="font-bold">Transmissiya:</span> {ad.transmission}</li>}
            {ad.location && <li><span className="font-bold">Yerləşmə:</span> {ad.location}</li>}
            {ad.description && <li className="line-clamp-4"><span className="font-bold">Qeyd:</span> {ad.description}</li>}
          </ul>

          {ad.userId === currentUserId && (
  <button
    onClick={handleDelete}
    className="mt-4 w-full py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg transition"
  >
    Elanı Sil
  </button>
)}

          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <p>Elanın nömrəsi: {ad._id}</p>
            <p>{ad.location}, {formatDate(ad.data)}, {getCurrentTime(ad.data)}</p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl shadow-md p-5 h-fit">
          <h2 className="text-xl font-bold mb-4">Əlaqə məlumatı</h2>
          <div className="space-y-2 text-gray-700">
            {ad.contact?.name && <p><span className="font-semibold">Ad:</span> {ad.contact.name}</p>}
            {ad.contact?.phone && <p><span className="font-semibold">Telefon:</span> <a href={`tel:${ad.contact.phone}`} className="text-blue-600 font-bold ml-1">{ad.contact.phone}</a></p>}
            {ad.contact?.email && <p><span className="font-semibold">Email:</span> {ad.contact.email}</p>}
            {ad.location && <p><span className="font-semibold">Şəhər:</span> {ad.location}</p>}
          </div>
          {ad.contact?.phone && <a href={`tel:${ad.contact.phone}`} className="w-full mt-6 py-3 block bg-green-500 hover:bg-red-700 text-white font-bold rounded-lg text-center transition">Zəng et</a>}
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-gray-700 mt-10 mb-4">Bənzər elanlar</h2>
      <div className="p-4 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] w-full">
        {allAds.map((item) => (
          <Link key={item._id} to={`/ads/${item._id}`} className="w-full">
            <div className="bg-white rounded-2xl sm:w-[240px] max-w-[240px] h-[300px] shadow-md hover:shadow-xl transition duration-200">
              <div className="w-full h-[178px] bg-gray-100 relative">
                <img
                  src={item.images?.[0]?.startsWith("http") ? item.images[0] : `${process.env.REACT_APP_API_URL}/uploads/${item.images?.[0]}`}
                  alt={item.brand}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-2">
                <h3 className="text-xl font-bold text-black">{item.price} AZN ₼</h3>
                <h2 className="text-lg truncate">{item.category}, {item.brand}, {item.model}</h2>
            
                <p className="capitalize text-gray-400 text-[14px]">{item.location}, {formatDate(item.data)} {getCurrentTime(item.data)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {zoomIndex !== null && (
        <div className="fixed inset-0 flex flex-col bg-black bg-opacity-90 justify-center items-center z-50" onClick={closeZoom}>
          <button onClick={closeZoom} className="absolute top-5 right-5 text-gray-600 hover:text-red-600"><X size={35} /></button>
          <button className="absolute left-5 text-white text-8xl" onClick={e => { e.stopPropagation(); prevImage(); }}>‹</button>
          <img src={imageArray[zoomIndex].startsWith("http") ? imageArray[zoomIndex] : `${process.env.REACT_APP_API_URL}/uploads/${imageArray[zoomIndex]}`} alt="Zoom" className="max-w-[90%] max-h-[90%] object-contain rounded-lg" />
          <button className="absolute right-5 text-white text-8xl" onClick={e => { e.stopPropagation(); nextImage(); }}>›</button>
        </div>
      )}
    </div>
  );
}
