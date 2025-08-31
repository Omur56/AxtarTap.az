import React, { useEffect, useState } from "react";
import Katalog from "../../pages/Katalog";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomMenu from "../../components/MobileMenu";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cars`);
        setCars(res.data);
      } catch (err) {
        console.error("Elanlar yüklənmədi:", err);
      }
    };

    fetchCars();
  }, []);

  const [homeGarden, setHomeGarden] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/homGarden`)
      .then((res) => {
      
        setHomeGarden(res.data);
      })
      .catch((err) => {
        console.error("Xəta baş verdi:", err);
      });
  }, []);

  const [elektronikaPost, setElektronikaPost] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/electronika`)
      .then((res) => {
        
        setElektronikaPost(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/accessories`)
      .then((res) => {
       
        setAccessories(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const [realEstate, setRealEstate] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/realEstate`)
      .then((res) => {
        
        setRealEstate(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const [Household, setHousehold] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/Household`)
      .then((res) => {
      
        setHousehold(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const [Phone, setPhone] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/Phone`)
      .then((res) => {
      
        setPhone(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const [Clothing, setClothing] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/Clothing`)
      .then((res) => {
      
        setClothing(res.data);
      })
      .catch((err) => {
        console.error("Xəta baise verdi:", err);
      });
  }, []);

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const postDay = new Date(postDate.setHours(0, 0, 0, 0));
    const diffTime = today - postDay;
    const oneDay = 24 * 60 * 60 * 1000;

    if (diffTime === 0) return "bugün";
    if (diffTime === oneDay) return "dünən";

    return postDate.toLocaleDateString("az-AZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCurrentTime = (isoString) => {
    const date = new Date(isoString);
    const time = date.toTimeString().split(" ")[0].slice(0, 5);
    return time;
  };

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

      // Axtarış: title və description sahələrində
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true); 
      try {
        const [
          carsRes,
          homeGardenRes,
          elektronikaRes,
          accessoriesRes,
          realEstateRes,
          householdRes,
          phoneRes,
          clothingRes,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/cars`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/homGarden`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/electronika`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/accessories`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/realEstate`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/Household`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/Phone`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/Clothing`),
        ]);

        setCars(carsRes.data);
        setHomeGarden(homeGardenRes.data);
        setElektronikaPost(elektronikaRes.data);
        setAccessories(accessoriesRes.data);
        setRealEstate(realEstateRes.data);
        setHousehold(householdRes.data);
        setPhone(phoneRes.data);
        setClothing(clothingRes.data);
      } catch (err) {
        console.error("API xətası:", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAll();
  }, []);


 const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ads`);
      setAds(res.data);
    } catch (err) {
      console.error("Reklamları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  
  return (

    
    <div className="min-h-scree">
  <div className="flex  justify-between gap-4">
       <div className="hidden md:block w-1/6 bg-white sticky top-4 h-screen  p-2 p-4">
        {ads.slice(0, 1).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
            <img
              src={`${process.env.REACT_APP_API_URL}/${ad.image}`}
              alt={ad.title}
              className="rounded-md w-full h-[550px]" />
          </a>
        ))}
      </div>

      <div className="flex-1 "> 
      <div className="max-w-5xl mx-auto p-4  gap-4">
             
  
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
      <BottomMenu />
      <main className="   max-w-5xl mx-auto ">
        <Katalog />

        <div className="mt-4 ">
          {loading && <Box sx={{ display: 'flex' }}>
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
                  to={`/item/${item._id} || ${item.id}`}
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
          <div className=" ring-2 bg-slate-400 h-[1px] mb-6 w-full"></div>
        </div>

        <div className="p-2 mt-6  justify-items-center rounded-[4px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] w-full">
          {isLoading ? (
            Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="sm:w-[240.4px] max-w-[240.4px] h-[300px] rounded-2xl shadow-md bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"
              >
                <div className="sm:w-[240.4px] max-w-[240.4px] h-[300px] bg-white rounded-2xl shadow-md ">
                  <div className="w-full h-[178.5px] rounded-t-[8px] mb-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-3/4 animate-shimmerh-6 bg-gray-300 rounded mb-1 w-3/4 animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded mb-1 w-2/3 animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/2 animate-shimmer"></div>

                  <div className="h-4 mt-[4px] bg-gray-300 rounded w-2/3 animate-shimmer "></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {[...cars].map((car) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={car.id}
                  to={`/cars/${car._id}`}
                >
                  <div className="sm:w-[240.4px] max-w-[240.4px] h-[300px] bg-white rounded-2xl shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <div className="w-full h-[178.5px] bg-gray-100 relative">
                      <img
                        src={car.images[0]}
                        alt={car.brand}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[8px]"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xl font-bold font-black text-black">
                        {car.price} AZN ₼
                      </h3>
                      <h2 className="text-lg truncate w-50">
                        {car.category}, {car.brand}, {car.model}
                      </h2>
                      <p className="text-gray-600 truncate w-64">
                        {car.year},{car.motor} {car.km} km
                      </p>
                      <p className="capitalize text-gray-400 text-[16px]">
                        {car.location}, {formatDate(car.data)}{" "}
                        {getCurrentTime(car.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...homeGarden].map((post) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={post._id}
                  to={`/elan/${post._id}`}
                >
                  <div key={post._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px] bg-white rounded-2xl shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        post.images && post.images.length > 0
                          ? post.images[0].startsWith("http")
                            ? post.images[0]
                            : `${process.env.REACT_APP_API_URL}/uploads/${post.images[0]}`
                          : "/no-image.jpg"
                      }
                      alt={post.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {post.price} AZN ₼
                      </h3>
                      <h2 className="text-sm font-bold truncate w-62">
                        {post.title}
                      </h2>

                      <p className="capitalize text-gray-400 text-[16px] mt-5">
                        {post.location}, {formatDate(post.data)}{" "}
                        {getCurrentTime(post.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...elektronikaPost].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostDetailElectronika/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-sm font-bold truncate w-62">
                        {item.category}
                      </h2>
                      <h3 className="text-lg font-semibold truncate w-62">
                        {item.title}
                      </h3>
                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...accessories].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostDetailAcsesuar/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-sm font-bold truncate w-62">
                        {item.category}
                      </h2>
                      <h3 className="text-lg font-semibold truncate w-62">
                        {item.title}
                      </h3>
                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...realEstate].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostRealEstate/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-sm font-bold truncate w-62">
                        {item.title_type}, {item.type_building}, {item.location}
                      </h2>

                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...Household].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostDetailHousehold/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-sm font-boldtruncate w-62">
                        {item.title}, {item.category}, {item.location}
                      </h2>

                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...Phone].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostDetailPhone/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-lg font-bold truncate w-62">
                        {item.title}, {item.brand}, {item.model}
                      </h2>
                      <h3 className="text-lg font-semibold"></h3>
                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {[...Clothing].reverse().map((item) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  to={`/PostDetailClothing/${item._id}`}
                >
                  <div key={item._id} className="sm:w-[240.4px] max-w-[240.4px] h-[300px]  bg-white rounded-2xl  shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : "/no-image.jpg"
                      }
                      alt={item.title}
                      className="w-full h-[178.5px] object-cover rounded-t-[8px]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-black">
                        {item.price} AZN ₼
                      </h3>
                      <h2 className="text-lg font-bold truncate w-62">
                        {item.title}, {item.brand}, {item.model}
                      </h2>
                      <h3 className="text-lg font-semibold"></h3>
                      <p className="capitalize text-gray-400 text-[16px]">
                        {item.location}, {formatDate(item.data)}{" "}
                        {getCurrentTime(item.data)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </main>
      </div>


      <div className="w-1/6 hidden md:block  sticky top-4 bg-white h-screen b p-2">
        {ads.slice(0, 1).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
            <img
              src={`${process.env.REACT_APP_API_URL}/${ad.image}`}
              alt={ad.title}
              className="rounded-md w-full h-[550px] shadow-md"
            />
          </a>
        ))}
      </div>
     </div>
    </div>
     
    
  );
};

export default Home;
