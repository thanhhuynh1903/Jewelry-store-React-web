import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Create from "components/atom/Create/Create";
import DataTables from "./views/admin/tables";
import Update from "components/atom/Update/Update";
// import RTLDefault from "views/rtl/default";
import PageDetailProduct from "views/admin/marketplace/pages/PageDetailProduct/PageDetailProduct";
// Auth Imports
import SignIn from "views/auth/SignIn";
import CreateProduct from "views/admin/marketplace/pages/CreateProduct/CreateProduct";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    show : "hidden",
    name: "Product detail",
    layout: "/admin",
    path: "nft-marketplace/:productId",
    component: <PageDetailProduct label={"Detail"}/>,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/",
    component: <DataTables />,
  },

  {
    show : "hidden",
    name: "Add product",
    layout: "/admin",
    path: "nft-marketplace/product/create",
    component: <CreateProduct label={"product"}/>,
  },

  {
    show : "hidden",
    name: "create material",
    layout: "/admin",
    path: "data-tables/material/create",
    component: <Create label={"Material"}/>,
  },
  {
    show : "hidden",
    name: "create Type",
    layout: "/admin",
    path: "data-tables/type/create",
    component: <Create label={"Type"}/>,
  },
  {
    show : "hidden",
    name: "create gemstone",
    layout: "/admin",
    path: "data-tables/gemstone/create",
    component: <Create label={"Gemstone"}/>,
  },
  {
    show : "hidden",
    name: "update material",
    layout: "/admin",
    path: "data-tables/material/update/:updateId",
    component: <Update label={"Material"}/>,
  },
  {
    show : "hidden",
    name: "update gemstone",
    layout: "/admin",
    path: "data-tables/gemstone/update/:updateId",
    component: <Update label={"Gemstone"}/>,
  },
  {
    show : "hidden",
    name: "update type",
    layout: "/admin",
    path: "data-tables/type/update/:updateId",
    component: <Update label={"Type"}/>,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  
];
export default routes;
