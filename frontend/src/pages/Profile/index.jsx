// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [myAnnouncements, setMyAnnouncements] = useState([]);
//   const [avatar, setAvatar] = useState(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!token || !userId) {
//       navigate("/login");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserData(res.data);
//         setAvatar(res.data.avatar || null);
//       } catch (err) {
//         console.error("User fetch error:", err);
//       }
//     };

//     const fetchMyAnnouncements = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/announcements/my-announcements", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMyAnnouncements(res.data);
//       } catch (err) {
//         console.error("Announcements fetch error:", err);
//       }
//     };

//     fetchUser();
//     fetchMyAnnouncements();
//   }, [navigate, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Həqiqətən silmək istəyirsiniz?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Bəli, sil",
//       cancelButtonText: "Ləğv et",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMyAnnouncements(prev => prev.filter(a => a._id !== id));
//         Swal.fire("Silindi!", "Elanınız uğurla silindi.", "success");
//       } catch (err) {
//         console.error(err);
//         Swal.fire("Xəta", "Elan silinə bilmədi.", "error");
//       }
//     }
//   };

//   const handleEdit = async (id) => {
//     const newTitle = prompt("Yeni başlıq daxil edin:");
//     const newDescription = prompt("Yeni təsvir daxil edin:");
//     if (!newTitle || !newDescription) return;
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/announcements/${id}`,
//         { title: newTitle, description: newDescription },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMyAnnouncements(prev => prev.map(a => (a._id === id ? res.data : a)));
//       Swal.fire("Uğurla dəyişdirildi!", "", "success");
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Xəta", "Dəyişiklik uğursuz oldu.", "error");
//     }
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const res = await axios.put(`http://localhost:5000/api/users/avatar`, formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
//       });
//       setAvatar(res.data.avatar);
//       Swal.fire("Uğur!", "Avatar yeniləndi", "success");
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Xəta", "Avatar yenilənə bilmədi", "error");
//     }
//   };

//   if (!userData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   const likedCount = myAnnouncements.filter(a => a.liked).length;
//   const favoriteCount = myAnnouncements.filter(a => a.favorite).length;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Profil və statistik bölmə */}
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
//         <div className="relative">
//           <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
//             {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : userData.username[0].toUpperCase()}
//           </div>
//           <input 
//             type="file" 
//             accept="image/*"
//             onChange={handleAvatarChange}
//             className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer"
//             title="Avatar dəyişdir"
//           />
//           <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 rounded-full text-xs cursor-pointer">
//             Dəyiş
//           </div>
//         </div>

//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-2">{userData.username}</h1>
//           <p className="text-gray-600 mb-1"><strong>Mobil:</strong> {userData.phone}</p>
//           <p className="text-gray-600 mb-1"><strong>Email:</strong> {userData.email}</p>

//           <div className="flex gap-4 mt-3">
//             <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold">
//               Elanlar: {myAnnouncements.length}
//             </div>
//             <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-semibold">
//               Bəyənilənlər: {likedCount}
//             </div>
//             <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
//               Sevimlilər: {favoriteCount}
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="mt-3 bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Elanlar bölməsi */}
//       <h2 className="text-xl font-semibold mt-8 mb-4 text-center md:text-left">Sizin Elanlarınız</h2>
//       {myAnnouncements.length === 0 ? (
//         <p className="text-center text-gray-500">Heç bir elanınız yoxdur.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {myAnnouncements.map(ann => (
//             <div key={ann._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
//               <div>
//                 <h3 className="text-lg font-bold mb-2 text-blue-600">{ann.title}</h3>
//                 <p className="text-gray-700 mb-4">{ann.description}</p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="text-sm text-gray-500">
//                   {ann.liked && <span className="mr-2">❤️ Bəyənilib</span>}
//                   {ann.favorite && <span>⭐ Sevimli</span>}
//                 </div>
//                 <div className="flex gap-2">
//                   <button 
//                     onClick={() => handleEdit(ann._id)} 
//                     className="bg-yellow-400 px-3 py-1 rounded-lg text-white hover:bg-yellow-500 transition"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(ann._id)} 
//                     className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Card, CardContent, CardMedia, Grid, Box, Dialog, IconButton } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [myAds, setMyAds] = useState([]); // bütün kateqoriyalar üçün
//   const [zoomIndex, setZoomIndex] = useState(null);
//   const [zoomCategory, setZoomCategory] = useState(null); // hansı kateqoriyada zoom
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!token || !userId) return navigate("/login");

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserData(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchMyAds = async () => {
//       try {
//         // Burada bütün kateqoriyaların API-larını çağırırıq
//         const categories = [
//           "cars", "realEstate", "homeAndGarden",
//           "electronika", "phone", "clothing", "houseHold", "accessories"
//         ];
//         const promises = categories.map(cat =>
//           axios.get(`http://localhost:5000/api/my-${cat}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }).then(res => res.data.map(ad => ({ ...ad, category: cat })))
//             .catch(() => [])
//         );
//         const results = await Promise.all(promises);
//         const allAds = results.flat(); // hamısını bir arraydə birləşdiririk
//         setMyAds(allAds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//     fetchMyAds();
//   }, [navigate, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   const handleDelete = async (id, category) => {
//     if (!window.confirm("Həqiqətən silmək istəyirsiniz?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/${category}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMyAds(prev => prev.filter(ad => ad._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err.response?.data || err.message);
//     }
//   };

//   const openZoom = (index) => setZoomIndex(index);
//   const closeZoom = () => {
//     setZoomIndex(null);
//     setZoomCategory(null);
//   };

//   const prevImage = () => setZoomIndex(prev => (prev === 0 ? myAds.length - 1 : prev - 1));
//   const nextImage = () => setZoomIndex(prev => (prev === myAds.length - 1 ? 0 : prev + 1));

//   if (!userData) return <Typography variant="h6" align="center">Loading...</Typography>;

//   return (
//     <Box p={3} sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Box maxWidth={900} mx="auto" bgcolor="white" p={3} borderRadius={3} boxShadow={3}>
//         <Typography variant="h4" align="center" gutterBottom>Profil Məlumatları</Typography>
//         <Typography><strong>İstifadəçi adı:</strong> {userData.username}</Typography>
//         <Typography><strong>Email:</strong> {userData.email}</Typography>
//         <Typography><strong>Mobil:</strong> {userData.phone} {userData.phoneVerified && "✅ Təsdiqlənib"}</Typography>

//         <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>Logout</Button>

//         <Typography variant="h5" mt={4} mb={2}>Sizin Elanlarınız</Typography>
//         {myAds.length === 0 ? (
//           <Typography>Heç bir elanınız yoxdur.</Typography>
//         ) : (
//           <Grid container spacing={2}>
//             {myAds.map((ad, index) => (
//               <Grid item xs={12} sm={6} md={4} key={ad._id}>
//                 <Card sx={{ cursor: "pointer" }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image={ad.images?.[0]?.startsWith("http") ? ad.images[0] : "/no-image.jpg"}
//                     alt={ad.title || ad.brand}
//                     onClick={() => { setZoomIndex(index); setZoomCategory(ad.category); }}
//                   />
//                   <CardContent>
//                     <Typography variant="subtitle2" noWrap>{ad.title || `${ad.brand || ""} ${ad.model || ""}`}</Typography>
//                     <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.2 }}>
//                       <strong>Kateqoriya:</strong> {ad.category}<br/>
//                       {ad.brand && <><strong>Marka:</strong> {ad.brand}<br/></>}
//                       {ad.model && <><strong>Model:</strong> {ad.model}<br/></>}
//                       {ad.year && <><strong>İl:</strong> {ad.year}<br/></>}
//                       {ad.price && <><strong>Qiymət:</strong> {ad.price} AZN<br/></>}
//                       {ad.location && <><strong>Şəhər/Rayon:</strong> {ad.location}<br/></>}
//                     </Typography>
//                     <Box mt={1} display="flex" gap={1}>
//                       <Button size="small" variant="outlined" color="warning" onClick={() => handleDelete(ad._id, ad.category)}>Delete</Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Box>

//       {/* Zoom Dialog */}
//       {zoomIndex !== null && (
//         <Dialog open={true} onClose={closeZoom} maxWidth="lg">
//           <Box position="relative" bgcolor="black">
//             <IconButton onClick={closeZoom} sx={{ position: "absolute", top: 10, right: 10, color: "white", zIndex: 10 }}>
//               <Close fontSize="large" />
//             </IconButton>
//             <IconButton onClick={prevImage} sx={{ position: "absolute", top: "50%", left: 10, color: "white", zIndex: 10 }}>
//               <ArrowBackIos fontSize="large" />
//             </IconButton>
//             <img
//               src={myAds[zoomIndex].images?.[0]?.startsWith("http") ? myAds[zoomIndex].images[0] : "/no-image.jpg"}
//               alt="Zoomed"
//               style={{ width: "100%", height: "80vh", objectFit: "contain" }}
//             />
//             <IconButton onClick={nextImage} sx={{ position: "absolute", top: "50%", right: 10, color: "white", zIndex: 10 }}>
//               <ArrowForwardIos fontSize="large" />
//             </IconButton>
//           </Box>
//         </Dialog>
//       )}
//     </Box>
//   );
// }











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Card, CardContent, CardMedia, Grid, Box, Dialog, IconButton } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [myAds, setMyAds] = useState([]);
//   const [zoomIndex, setZoomIndex] = useState(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [editAd, setEditAd] = useState(null);
//   const [editData, setEditData] = useState({});

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!token || !userId) return navigate("/login");

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserData(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchMyAds = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/my-announcements", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         // bütün elanlar backenddən gəlir
//         setMyAds(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//     fetchMyAds();
//   }, [navigate, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   const handleEdit = (ad) => {
//     setEditAd(ad);
//     setEditData(ad);
//   };

//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/${editAd.categoryType}/${editAd._id}`,
//         editData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMyAds((prev) =>
//         prev.map((ad) => (ad._id === editAd._id ? { ...ad, ...editData } : ad))
//       );
//       setEditAd(null);
//     } catch (err) {
//       console.error("Update error:", err.response?.data || err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     const ad = myAds.find((ad) => ad._id === id);
//     if (!window.confirm("Həqiqətən silmək istəyirsiniz?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/${ad.categoryType}/${ad._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMyAds((prev) => prev.filter((a) => a._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err.response?.data || err.message);
//     }
//   };

//   if (!userData) return <Typography variant="h6" align="center">Loading...</Typography>;

//   return (
//     <Box p={3} sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Box maxWidth={900} mx="auto" bgcolor="white" p={3} borderRadius={3} boxShadow={3}>
//         <Typography variant="h4" align="center" gutterBottom>Profil Məlumatları</Typography>
//         <Typography><strong>İstifadəçi adı:</strong> {userData.username}</Typography>
//         <Typography><strong>Email:</strong> {userData.email}</Typography>
//         <Typography><strong>Mobil:</strong> {userData.phone} {userData.phoneVerified && "✅ Təsdiqlənib"}</Typography>

//         <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>Logout</Button>

//         <Typography variant="h5" mt={4} mb={2}>Sizin Elanlarınız</Typography>
//         {myAds.length === 0 ? (
//           <Typography>Heç bir elanınız yoxdur.</Typography>
//         ) : (
//           <Grid container spacing={2}>
//             {editAd && (
//               <Dialog open={true} onClose={() => setEditAd(null)} maxWidth="sm" fullWidth>
//                 <Box p={3}>
//                   <Typography variant="h6" gutterBottom>Elanı Redaktə et</Typography>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editData.title || ""}
//                     onChange={handleChange}
//                     placeholder="Başlıq"
//                     style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//                   />
//                   <input
//                     type="number"
//                     name="price"
//                     value={editData.price || ""}
//                     onChange={handleChange}
//                     placeholder="Qiymət"
//                     style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//                   />
//                   <input
//                     type="text"
//                     name="location"
//                     value={editData.location || ""}
//                     onChange={handleChange}
//                     placeholder="Şəhər/Rayon"
//                     style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//                   />
//                   <Box display="flex" gap={2} mt={2}>
//                     <Button variant="contained" color="primary" onClick={handleUpdate}>Yadda saxla</Button>
//                     <Button variant="outlined" color="secondary" onClick={() => setEditAd(null)}>Ləğv et</Button>
//                   </Box>
//                 </Box>
//               </Dialog>
//             )}

//             {myAds.map((ad, index) => (
//               <Grid item xs={12} sm={6} md={4} key={ad._id}>
//                 <Card sx={{ cursor: "pointer" }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image={ad.images?.[0]?.startsWith("http") ? ad.images[0] : "/no-image.jpg"}
//                     alt={ad.title || ad.brand}
//                     onClick={() => setZoomIndex(index)}
//                   />
//                   <CardContent>
//                     <Typography variant="subtitle2" noWrap>
//                       {ad.title || `${ad.brand || ""} ${ad.model || ""}`}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.2 }}>
//                       <strong>Kateqoriya:</strong> {ad.categoryType}<br />
//                       {ad.brand && <><strong>Marka:</strong> {ad.brand}<br /></>}
//                       {ad.model && <><strong>Model:</strong> {ad.model}<br /></>}
//                       {ad.year && <><strong>İl:</strong> {ad.year}<br /></>}
//                       {ad.price && <><strong>Qiymət:</strong> {ad.price} AZN<br /></>}
//                       {ad.location && <><strong>Şəhər/Rayon:</strong> {ad.location}<br /></>}
//                     </Typography>
//                     <Box mt={1} display="flex" gap={1}>
//                       <Button size="small" variant="outlined" color="warning" onClick={() => handleDelete(ad._id)}>Delete</Button>
//                       <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(ad)}>Edit</Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Box>

//       {zoomIndex !== null && (
//         <Dialog open={true} onClose={() => setZoomIndex(null)} maxWidth="lg">
//           <Box position="relative" bgcolor="black">
//             <IconButton onClick={() => setZoomIndex(null)} sx={{ position: "absolute", top: 10, right: 10, color: "white" }}>
//               <Close fontSize="large" />
//             </IconButton>
//             <IconButton onClick={() => setZoomIndex(prev => (prev === 0 ? myAds.length - 1 : prev - 1))} sx={{ position: "absolute", top: "50%", left: 10, color: "white" }}>
//               <ArrowBackIos fontSize="large" />
//             </IconButton>
//             <img
//               src={myAds[zoomIndex].images?.[0]?.startsWith("http") ? myAds[zoomIndex].images[0] : "/no-image.jpg"}
//               alt="Zoomed"
//               style={{ width: "100%", height: "80vh", objectFit: "contain" }}
//             />
//             <IconButton onClick={() => setZoomIndex(prev => (prev === myAds.length - 1 ? 0 : prev + 1))} sx={{ position: "absolute", top: "50%", right: 10, color: "white" }}>
//               <ArrowForwardIos fontSize="large" />
//             </IconButton>
//           </Box>
//         </Dialog>
//       )}
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography, Card, CardContent } from "@mui/material";

export default function Profile() {
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return navigate("/login");
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyAds = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-announcements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyAds(res.data);
    } catch (err) {
      console.error("Elanları gətirərkən xəta:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMyAds();
  }, []);



const modelMap = {
  homGarden: "homGarden",
  Clothing: "clothing",
  Phone: "phone",
  Household: "household",
  RealEstate: "realEstate",
  accessories: "accessories",
  cars: "cars",
  electronika: "electronika",
};

const handleDelete = async (ad) => {
  if (!window.confirm("Bu elanı silmək istədiyinizə əminsiniz?")) return;

  try {
    console.log("Silinəcək ID:", ad._id);

    await axios.delete(`${process.env.REACT_APP_API_URL}/api/${modelMap[ad.modelName]}/${ad._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMyAds((prev) => prev.filter((a) => a._id !== ad._id));
    alert("Elan uğurla silindi!");
  } catch (err) {
    console.error("Elan silinmədi:", err.response?.data || err);
    alert("Elan silinmədi. Backend-də problem var.");
  }
};


  const openAdDetail = (id) => navigate(`/ads/${id}`);

  const getAdImage = (ad) => {
    if (ad.images && ad.images.length > 0) {
      const firstImage = ad.images[0];
      if (firstImage.startsWith("http")) return firstImage;
      return `${process.env.REACT_APP_API_URL}/uploads/${firstImage}`;
    }
    return "/no-image.jpg";
  };

  if (loading) return <p className="text-center mt-10">Yüklənir...</p>;


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Box className="min-h-screen max-w-[1000px] mx-auto p-6 bg-gray-100">
       
      {/* Müasir Profil Kartı */}
      {userData && (
        <Card sx={{ mb: 6, p: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Profil Məlumatları
            </Typography>
            <Typography variant="body1"><strong>İstifadəçi adı:</strong> {userData.username}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant="body1">
              <strong>Mobil:</strong> {userData.phone || "-"} {userData.phoneVerified && "✅ Təsdiqlənib"}
            </Typography>
            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>Çıxış</Button>
          </CardContent>
        </Card>
      )}

      {/* İstifadəçi elanları */}
      <Typography variant="h3" align="center" gutterBottom>Mənim Elanlarım</Typography>
      {myAds.length === 0 ? (
        <Typography align="center" color="text.secondary">Hazırda heç bir elanınız yoxdur.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAds.map((ad) => (
            <div
              key={ad._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
              onClick={() => openAdDetail(ad._id)}
            >
              <div className="w-full h-48 bg-gray-200">
                <img
                  src={getAdImage(ad)}
                  alt={ad.title || "Elan"}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "/no-image.jpg"; }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-1">{ad.title || "Başlıq yoxdur"}</h2>
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {ad.description ? ad.description.slice(0, 100) + "..." : "Təsvir yoxdur"}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-green-600 font-bold text-lg">{ad.price ? ad.price + " ₼" : "-"}</span>
                 <button
      onClick={() => handleDelete(ad)}
      className="delete-btn"
      style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
    >
      Sil
    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
}
