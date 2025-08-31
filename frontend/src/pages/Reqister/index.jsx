
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/reqister`, {
        username,
        email,
        password,
        phone:  `+994${phone}` 
      });
          Swal.fire({
      icon: "success",
      title: "Uğurla qeydiyyat tamamlandı!",
      text: "İndi daxil ola bilərsiniz",
      confirmButtonColor: "#3085d6",
    });
     navigate("/profile");


    } catch (err) {
      console.error(err.response?.data || err.message);
        Swal.fire({
      icon: "error",
      title: "Xəta baş verdi",
      text: err.response?.data?.message || "Server xətası",
      confirmButtonColor: "#d33",
    });
    }
  };

  return (
  <div className="min-h-[58.4vh] ">
    <form 
  onSubmit={handleRegister} 
  className="max-w-md mx-auto mt-2 mb-1 bg-white shadow-lg rounded-xl p-8 space-y-5"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Qeydiyyat</h2>

  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">Username</label>
    <input 
      value={username} 
      onChange={e => setUsername(e.target.value)} 
      placeholder="Username" 
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
<div className="flex flex-col">
<label className="mb-1 font-medium text-gray-700">Mobil Nömrə</label>
      <InputMask
        mask="99 999 99 99" 
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="555 55 55 55"
      >
        {(inputProps) => (
          <div className="flex">
            <span className="px-3 py-2 bg-gray-200 rounded-l border border-r-0 border-gray-300">
              +994
            </span>
            <input
              {...inputProps}
              className="border border-gray-300 rounded-r px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        )}
      </InputMask>
  </div>
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
    Register
  </button>
</form>
</div>
  );
}


