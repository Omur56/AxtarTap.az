// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [myAnnouncements, setMyAnnouncements] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");


//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: token }
//         });
//         setUserData(res.data);
//       } catch (err) { console.error(err); }
//     };

    
//     const fetchMyAnnouncements = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/my-announcements`, {
//           headers: { Authorization: token }
//         });
//         setMyAnnouncements(res.data);
//       } catch (err) { console.error(err); }
//     };

//     fetchUser();
//     fetchMyAnnouncements();
//   }, [token]);


//   const handleDelete = async (id) => {
//     if (!window.confirm("Həqiqətən silmək istəyirsiniz?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
//         headers: { Authorization: token }
//       });
//       setMyAnnouncements(prev => prev.filter(a => a._id !== id));
//     } catch (err) {
//       console.error(err);
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
//         { headers: { Authorization: token } }
//       );

//       setMyAnnouncements(prev =>
//         prev.map(a => (a._id === id ? res.data : a))
//       );
//     } catch (err) { console.error(err); }
//   };

//   if (!userData) return <div>Loading...</div>;

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-3">Profil Məlumatları</h1>
//       <p><strong>Username:</strong> {userData.username}</p>
//       <p><strong>Email:</strong> {userData.email}</p>

//       <h2 className="text-xl font-semibold mt-5 mb-2">Sizin Elanlarınız</h2>
//       {myAnnouncements.length === 0 ? (
//         <p>Heç bir elanınız yoxdur.</p>
//       ) : (
//         <ul className="list-disc ml-5">
//           {myAnnouncements.map(ann => (
//             <li key={ann._id} className="mb-2 border p-2 rounded shadow">
//               <strong>{ann.title}</strong>
//               <p>{ann.description}</p>
//               <div className="mt-1 flex gap-2">
//                 <button
//                   onClick={() => handleEdit(ann._id)}
//                   className="bg-yellow-400 px-2 rounded text-white"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(ann._id)}
//                   className="bg-red-500 px-2 rounded text-white"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) { console.error("User fetch error:", err); }
    };

    const fetchMyAnnouncements = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/announcements/my-announcements`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyAnnouncements(res.data);
      } catch (err) { console.error("Announcements fetch error:", err); }
    };

    fetchUser();
    fetchMyAnnouncements();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Həqiqətən silmək istəyirsiniz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyAnnouncements(prev => prev.filter(a => a._id !== id));
    } catch (err) { console.error(err); }
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
    } catch (err) { console.error(err); }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Profil Məlumatları</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>

      <h2 className="text-xl font-semibold mt-5 mb-2">Sizin Elanlarınız</h2>
      {myAnnouncements.length === 0 ? (
        <p>Heç bir elanınız yoxdur.</p>
      ) : (
        <ul className="list-disc ml-5">
          {myAnnouncements.map(ann => (
            <li key={ann._id} className="mb-2 border p-2 rounded shadow">
              <strong>{ann.title}</strong>
              <p>{ann.description}</p>
              <div className="mt-1 flex gap-2">
                <button onClick={() => handleEdit(ann._id)} className="bg-yellow-400 px-2 rounded text-white">Edit</button>
                <button onClick={() => handleDelete(ann._id)} className="bg-red-500 px-2 rounded text-white">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

