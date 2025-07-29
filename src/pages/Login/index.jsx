// // src/pages/Login.jsx
// import React, { useState } from "react";
// import CustomButton from "../components/Button";


// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Burada login logicini yaza bilərsən (məs: fetch/axios)
//     console.log("Email:", email);
//     console.log("Şifrə:", password);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
//       >
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="Şifrə"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />

//         <CustomButton
//           type="submit"
//           title="Daxil Ol"
//           className="w-full"
//         />
//       </form>
//     </div>
//   );
// }

// export default Login;