import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const [identifier, setIdentifier] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!identifier) {
      return Swal.fire("Xəta", "Username, email və ya nömrə daxil edin!", "warning");
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
        identifier
      });

      Swal.fire("Uğur!", res.data.message, "success");
      setIdentifier(""); 
    } catch (err) {
      console.error("Reset failed:", err.response?.data || err.message);
      Swal.fire(
        "Xəta",
        err.response?.data?.message || err.message,
        "error"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 mb-12 bg-white shadow-lg rounded-xl p-8 space-y-5">
      <form onSubmit={handleResetPassword} className="space-y-5">
        <h2 className="text-2xl font-bold text-center text-gray-800">Şifrəni Bərpa Et</h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Username / Email / Phone
          </label>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Məsələn: elcan, elcan@gmail.com, +994555555555"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg"
        >
          Şifrəni Bərpa Et
        </button>
      </form>
    </div>
  );
}
