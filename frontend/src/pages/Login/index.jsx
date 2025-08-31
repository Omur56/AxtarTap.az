import { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null); // burada setAuth yaradılır
  const navigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password
//       });
//       setAuth(res.data.token); // indi səhv verməyəcək
//       localStorage.setItem("token", res.data.token);
//        localStorage.setItem("username", res.data.username); 
//              localStorage.setItem("username", res.data.username); // profil üçün
//       localStorage.setItem("userId", res.data.userId);
//       navigate("/");
//       console.log("Login successful:", res.data);
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
      email,
      password
    });

    // Token və user məlumatlarını localStorage-a yaz
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("username", res.data.username);

    console.log("Login uğurlu:", res.data);
    navigate("/profile"); // login sonrası səhifəyə yönləndir
  } catch (err) {
    console.error("Login xətası:", err.response?.data || err.message);
  }
};

  return (
    <div className="min-h-[58.4vh]">
    <form 
  onSubmit={handleSubmit} 
  className="max-w-md    mx-auto mt-16 mb-10 bg-white shadow-lg rounded-xl p-8 space-y-5"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Daxil Ol</h2>

  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">Email</label>
    <input 
      type="email"
      value={email} 
      onChange={e => setEmail(e.target.value)} 
      placeholder="Email" 
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">Password</label>
    <input 
      type="password" 
      value={password} 
      onChange={e => setPassword(e.target.value)} 
      placeholder="Password" 
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>

  <button 
    type="submit" 
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
  >
    Login
  </button>

  <p>Qeydiyyatız yoxdur? elə isə  <Link to={`/reqister`} className="text-blue-500 hover:underline font-bold cursor: pointer">Qeydiyyatdan keçin</Link></p>
</form>
</div>
  );
}


