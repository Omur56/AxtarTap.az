import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Qaydalar from "../pages/Qaydalar";
import Yardim from "../pages/Yardım";
import Xidmetler from "../pages/Xidmetler";
import RootLayout from "../components/Main";
import Katalog from "../pages/Katalog";
import Home from "../pages/Home";
import Nəqliyyat from "../pages/Katalog/Neqliyyat";
import EvVəBag from "../pages/Katalog/Ev_veBag";
import Elektronika from "../pages/Katalog/Elektronika";
import Geyimlər from "../pages/Katalog/Geyimlər";
import Zinət_əşyaları from "../pages/Katalog/Zinət_əşyaları";
import Telefonlar from "../pages/Katalog/Telefonlar";
import Daşınmaz_əmlak from "../pages/Katalog/Daşınmaz_əmlak";
import Məişət_Texnikası from "../pages/Katalog/Məişət_Texnikası";
import Ehtiyyat_hissələri_ve_aksesuarlar from "../pages/Katalog/Ehtiyyat_hissələri_ve_aksesuarlar";
import PostDetail from "../pages/PostDetailHome";
import PostDetalCar from "../pages/PostDetalCar";
import CreateCatalogPost from "../pages/CreateCatalogPost";
import PostDetailElectronika from "../pages/PostDetailElectronika";
import PostDetailAcsesuar from "../pages/PostDetailAcsesuar";
import PostRealEstate from "../pages/PostRealEstate";
import PostDetailHousehold from "../pages/PostDetailHousehold";
import PostDetailPhone from "../pages/PostDetailPhone";
import PostDetailClothing from "../pages/PostDetailClothing";
import PostDetailJewelry from "../pages/PostDetailJewelry";
import PostDetailHome from "../pages/PostDetailHome";
import PrivateRoute from "../components/PrivateRoute";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Reqister from "../pages/Reqister";
import Profile from "../pages/Profile";
import Admin from "../pages/AdminPanel";
import AdsPanel from "../pages/AdsPanel";
import AdminLogin from "../pages/AdminLogin";
// import MyHomeAndGarden from "../backend/models/HomeAndGarden";
import AdDetail from "../pages/AdDetail";
const router = createBrowserRouter([
  <RootLayout />,
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/",
        Component: Home,
      },
      {
        path: "/AdsPanel",
        Component: AdsPanel,
      },
     
      {
        path: "/Katalog",
        Component: Katalog,
      },
      {
        path: "/CreateCatalogPost",
        Component: CreateCatalogPost,
      },
      {
        path: "/Katalog/Nəqliyyat",
        Component: Nəqliyyat,
      },
      {
        path: "/cars/:id",
        Component: PostDetalCar,
      },
      {
        path: "/Katalog/Ev_veBag",
        Component: EvVəBag,
      },

      {
        path: "/elan/:id",
        Component: PostDetail,
      },
      {
        path: "/PostDetalCar/:id",
        Component: PostDetalCar,
      },
      {
        path: "/PostDetailElectronika/:id",
        Component: PostDetailElectronika,
      },
      {
        path: "/PostDetailAcsesuar/:id",
        Component: PostDetailAcsesuar,
      },

      { path: "/PostRealEstate/:id", Component: PostRealEstate },

      {
        path: "/PostDetailHousehold/:id",
        Component: PostDetailHousehold,
      },
      {
        path: "/PostDetailPhone/:id",
        Component: PostDetailPhone,
      },

      {
        path: "/PostDetailClothing/:id",
        Component: PostDetailClothing,
      },
      {
        path: "/PostDetailJewelry/:id",
        Component: PostDetailJewelry,
      },
      {
        path: "/PostDetailHome/:id",
        Component: PostDetailHome,
      },
      {
        path: "/Katalog/Elektronika",
        Component: Elektronika,
      },
      {
        path: "/Katalog/Geyimlər",
        Component: Geyimlər,
      },
      {
        path: "/Katalog/Zinət_əşyaları",
        Component: Zinət_əşyaları,
      },
      {
        path: "/Katalog/Telefonlar",
        Component: Telefonlar,
      },
      {
        path: "/Katalog/Daşınmaz_əmlak",
        Component: Daşınmaz_əmlak,
      },
      {
        path: "/Katalog/Məişət_Texnikası",
        Component: Məişət_Texnikası,
      },
      {
        path: "/Katalog/Ehtiyyat_hissələri_ve_aksesuarlar",
        Component: Ehtiyyat_hissələri_ve_aksesuarlar,
      },

      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/qaydalar",
        Component: Qaydalar,
      },

      {
        path: "/yardim",
        Component: Yardim,
      },
      {
        path: "/Xidmetler",
        Component: Xidmetler,
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/reqister",
        Component: Reqister,
      },

      {
        path: "/search",
        Component: Search,
      },
// {
//         path: "/my-homeAndGarden ",
//         Component: MyHomeAndGarden,
//       },
      {
        path: "/AdminPanel",
        Component: Admin,
      },

      {
        path: "/admin/login",
         Component: AdminLogin,
      },
      {
        path: "/ads/:id",
        Component: AdDetail, 
      },

      {
        path: "/",
        Component: () => {
          <PrivateRoute>
            <Home />
          </PrivateRoute>;
        },
      },
      // {
      //   path: "/Profile",
      //   Component: () => {
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>;
      //   },
      // },

      {
        path: "/Profile",
        Component: Profile,
      },
      
    ],
  },
]);

export default router;
