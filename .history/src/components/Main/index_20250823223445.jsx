import {Outlet,  useNavigate } from "react-router-dom";
import {useEfect, useState, } from  "react-rouer-dom";
import Footer from "../Footer";
import BottomMenu from "../MobileMenu";
import Header from "../Header";



const RootLayout = () => {
  const navigate = useNavigate();
   const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data);
    } catch (err) {
      console.error("Reklamları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  return (
   <div className=" bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
       <Header />
       <div className="w-1/6 z-50 fixed space-y-4 ">
        {ads.slice(0, 3).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
            <img
  src={`http://localhost:5000/${ad.image}`} // path tam URL ilə
  alt={ad.title}
/>
          </a>
        ))}
      </div>

 <div className="w-1/6 fixed  space-y-4">
        {ads.slice(3, 6).map((ad) => (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer">
           <img
  src={`http://localhost:5000/${ad.image}`} // path tam URL ilə
  alt={ad.title}
/>
          
          </a>
        ))}
      </div>
      <Outlet />
       <Footer/>
      <BottomMenu />
   </div>
  );
};

export default RootLayout;
