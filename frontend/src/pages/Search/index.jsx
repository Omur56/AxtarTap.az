import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrls = [
    `${process.env.REACT_APP_API_URL}/api/cars`,
    `${process.env.REACT_APP_API_URL}/api/homGarden`,
    `${process.env.REACT_APP_API_URL}/api/electronika`,
    `${process.env.REACT_APP_API_URL}/api/accessories`,
    `${process.env.REACT_APP_API_URL}/api/realEstate`,
    `${process.env.REACT_APP_API_URL}/api/Household`,
    `${process.env.REACT_APP_API_URL}/api/Phone`,
    `${process.env.REACT_APP_API_URL}/api/Clothing`,
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const requests = apiUrls.map((url) => axios.get(url));
      const responses = await Promise.all(requests);

      let allData = [];
      responses.forEach((res) => {
        if (Array.isArray(res.data)) allData = allData.concat(res.data);
      });

      const filtered = allData.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const brand = item.brand?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";
        const model = item.model?.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const city = item.city?.toLowerCase() || "";
        const engine = item.engine?.toLowerCase() || "";
        const year = item.year?.toLowerCase() || "";
        const motor = item.motor?.toLowerCase() || "";
        const transmission = item.transmission?.toLowerCase() || "";
        const ban_type = item.ban_type?.toLowerCase() || "";
        const price = item.price?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        return (
          title.includes(query.toLowerCase()) ||
          brand.includes(query.toLowerCase()) ||
          category.includes(query.toLowerCase()) ||
          location.includes(query.toLowerCase()) ||
          model.includes(query.toLowerCase()) ||
          city.includes(query.toLowerCase()) ||
          engine.includes(query.toLowerCase()) ||
          year.includes(query.toLowerCase()) ||
          motor.includes(query.toLowerCase()) ||
          transmission.includes(query.toLowerCase()) ||
          ban_type.includes(query.toLowerCase()) ||
          price.includes(query.toLowerCase()) ||
          description.includes(query.toLowerCase())
        );
      });

      setResults(filtered);
    } catch (error) {
      console.error("API axtarış xətası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
    <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4 justify-center">
      <div className="my-auto mx-auto p-4 flex flex-col gap-4 max-w-[1000px] ">
        <div className="w-full justify-center mx-auto my-auto max-w-[700px] min-w-[200px]">
          <div className="relative">
            <input
              className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="AxtarTap..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded bg-green-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-blue-700 focus:shadow-none active:bg-slate-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Axtar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {loading &&  <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
        {loading && results.length === 0 && (
          <p className="text-red-500">Nəticə tapılmadı.</p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((item, index) => (
              <Link
                key={item.id || item._id}
                to={`/cars/${item.id} || ${item._id}`}
              >
                <div
                  key={index}
                  className="border sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : item.imageUrls && item.imageUrls.length > 0
                        ? item.imageUrls[0]
                        : "/placeholder.png"
                    }
                    alt={item.title || "Image"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {item.price} AZN
                    </h2>
                    <h3 className="text-lg font-semibold mb-1">
                      {item.title} {item.category}, {item.brand}, {item.model}
                    </h3>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600">{item.model}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className=" ring-2 w-full my-4"></div>
      </div>
    </div>
    </div>
  );
};

export default Search;
