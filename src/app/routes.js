import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Users from "../pages/Users";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Dashboard/Settings";
import Analytics from "../pages/Dashboard/Analytics";
import UsersDetails from "../pages/Users/UsersDetails";
import RootLayout from "../components/Main";
import Katalog from "../pages/Katalog";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Nəqliyyat from "../pages/Katalog/Neqliyyat";
import EvVəBag from "../pages/Katalog/Ev_veBag";
import Elektronika from "../pages/Katalog/Elektronika";
import Geyimlər from "../pages/Katalog/Geyimlər";
import Zinət_əşyaları from "../pages/Katalog/Zinət_əşyaları";
import Telefonlar from "../pages/Katalog/Telefonlar";
import Daşınmaz_əmlak from "../pages/Katalog/Daşınmaz_əmlak";
import Məişət_Texnikası from "../pages/Katalog/Məişət_Texnikası";
import Ehtiyyat_hissələri_ve_aksesuarlar from "../pages/Katalog/Ehtiyyat_hissələri_ve_aksesuarlar";
import PostDetail from "../pages/PostDetail";
import PostDetalCar from "../pages/PostDetalCar";
import CreateCatalogPost from "../pages/CreateCatalogPost";




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
        path: "users",
        Component: Users,
      },
      {
        path: "users/:id",
        Component: UsersDetails,
      },
    
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/Katalog",
        Component: Katalog,
       
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
        path: "/register",
        Component: Register,
      },
     
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/users",
        Component: Users,
      },
      {
        path: "/users/UsersDetails",
        Component: UsersDetails,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/dashboard/settings",
        Component: Settings,
      },
      {
        path: "/dashboard/analytics",
        Component: Analytics,
      },
      {
        path: "/login",
        Component: Login,
      },
     {
      path: "/CreateCatalogPost",
      Component: CreateCatalogPost,
     }
    ],
  },
]);

export default router;
