import type { RouteObject } from "react-router";
import ClientLayout from "../layouts/client/ClientLayout";
import Home from "../pages/Home";
import Investor from "../pages/Investor";
import KOS from "../pages/KOS";
import Match from "../pages/Match";
import Resources from "../pages/Resources";
import KOSDetail from "../pages/KOSDetail";
import InvestorDetail from "../pages/InvestorDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import InvestmentDocuments from "../pages/InvestmentDocuments";
import RegionalRisk from "../pages/RegionalRisk";
import AdminDashboard from "../pages/AdminDashboard";


const ROUTES: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ClientLayout />, // Bütün əsas səhifələr layout ilə
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "investor",
        element: <Investor />,
      },
      {
        path: "investor/:id",
        element: <InvestorDetail />,
      },
      {
        path: "kos",
        element: <KOS />,
      },
      {
        path: "kos/:id",
        element: <KOSDetail />,
      },
      {
        path: "match",
        element: <Match />,
      },
      {
        path: "resources",
        element: <Resources />,
      },
      {
        path: "documents",
        element: <InvestmentDocuments />,
      },
      {
        path: "regional-risk",
        element: <RegionalRisk />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
];

export default ROUTES;
