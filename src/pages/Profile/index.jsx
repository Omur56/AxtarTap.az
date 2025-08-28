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


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    const fetchMyAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements/my-announcements", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyAnnouncements(res.data);
      } catch (err) {
        console.error("Announcements fetch error:", err);
      }
    };

    fetchUser();
    fetchMyAnnouncements();
  }, [navigate]);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const sendOtp = async () => {
    if (!userData.phone) return alert("Telefon nömrəsi yoxdur!");
    try {
      await axios.post("http://localhost:5000/api/send-otp", { phone: userData.phone });
      setOtpSent(true);
      alert("OTP göndərildi!");
    } catch (err) {
      console.error(err);
      alert("OTP göndərilə bilmədi");
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("OTP daxil edin!");
    setVerifying(true);
    try {
      await axios.post("http://localhost:5000/api/verify-otp", {
        phone: userData.phone,
        otp
      });
      alert("Telefon təsdiqləndi!");
      setOtpSent(false);
      setOtp("");
      setUserData({ ...userData, phoneVerified: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Xəta baş verdi");
    } finally {
      setVerifying(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Həqiqətən silmək istəyirsiniz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyAnnouncements(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    const newTitle = prompt("Yeni başlıq daxil edin:");
    const newDescription = prompt("Yeni təsvir daxil edin:");
    if (!newTitle || !newDescription) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/announcements/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyAnnouncements(prev => prev.map(a => (a._id === id ? res.data : a)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Profil Məlumatları</h1>
        <p><strong>İstifadəçi adı:</strong> {userData.username}</p>
        <p className="flex items-center gap-2">
          <strong>Mobil:</strong> {userData.phone} 
          {userData.phoneVerified ? (
            <span className="text-green-600 font-semibold ml-2">Təsdiqlənib ✅</span>
          ) : (
            <button
              onClick={sendOtp}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
            >
              OTP Göndər
            </button>
          )}
        </p>

        {otpSent && !userData.phoneVerified && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="OTP daxil edin"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border px-3 py-2 rounded w-32"
            />
            <button
              onClick={verifyOtp}
              disabled={verifying}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              {verifying ? "Yoxlanır..." : "Təsdiqlə"}
            </button>
          </div>
        )}

        <p><strong>Email:</strong> {userData.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
        >
          Logout
        </button>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Sizin Elanlarınız</h2>
        {myAnnouncements.length === 0 ? (
          <p>Heç bir elanınız yoxdur.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myAnnouncements.map(ann => (
              <li key={ann._id} className="border p-4 rounded shadow hover:shadow-lg transition bg-gray-50">
                <h3 className="text-lg font-bold mb-1">{ann.title}</h3>
                <p className="mb-2">{ann.description}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(ann._id)} 
                    className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(ann._id)} 
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
