// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import { Outlet } from "react-router-dom";

// export default function Layout({ children }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const apiUrls = [
//         "http://localhost:5000/api/cars",
//         "http://localhost:5000/api/homGarden",
//         "http://localhost:5000/api/electronika",
//         "http://localhost:5000/api/accessories",
//         "http://localhost:5000/api/realEstate",
//         "http://localhost:5000/api/Household",
//         "http://localhost:5000/api/Phone",
//         "http://localhost:5000/api/Clothing"
//       ];

//       // Bütün API-ləri eyni vaxtda çağır
//       const responses = await Promise.all(apiUrls.map(url => axios.get(url)));

//       // Bütün gələn data-ları bir massivdə birləşdir
//       let allData = [];
//       responses.forEach(res => {
//         if (Array.isArray(res.data)) {
//           allData = allData.concat(res.data);
//         }
//       });

//       setData(allData); // state-ə yaz
//     } catch (err) {
//       console.error("Məlumat yüklənmədi:", err);
//     } finally {
//       setLoading(false); // loading bitdi
//     }
//   };

//   fetchData();
// }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-grow p-5 bg-gray-50">
// {children}
//         <Outlet />

//         {/* Loading və ya Data */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse mt-5">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="p-4 border rounded shadow bg-white">
//                 <div className="h-40 bg-gray-300 rounded mb-3"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
//             {data.map((item) => (
//               <div
//                 key={item.id}
//                 className="p-4 border rounded shadow bg-white hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold">{item.title}</h3>
//                 <p className="text-gray-600">Əlavə məlumat...</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer həmişə aşağıda qalır */}
//       <Footer />
//     </div>
//   );
// }
// // 