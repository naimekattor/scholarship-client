import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Scholarships from "../pages/Scholarships";
import Auth from "../pages/Auth";
import AdminDashboard from "../pages/AdminDashboard";
import ModeratorDashboard from "../pages/ModeratorDashboard";
import UserDashboard from "../pages/UserDashboard";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import ApplyScholarship from "../pages/ApplyScholarship";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout"; // Create a layout for pages with Navbar/Footer
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/scholarships", element: <Scholarships /> },
      {
        path: "/scholarship/:id",
        element: <PrivateRoute><ScholarshipDetails /></PrivateRoute>,
      },
      {
        path: "/apply-scholarship/:id",
        element: <PrivateRoute><ApplyScholarship /></PrivateRoute>,
      },
      {
        path: "/user/dashboard",
        element: <PrivateRoute allowedRoles={['user', 'moderator', 'admin']}><UserDashboard /></PrivateRoute>,
      },
      {
        path: "/moderator/dashboard",
        element: <PrivateRoute allowedRoles={['moderator', 'admin']}><ModeratorDashboard /></PrivateRoute>,
      },
      {
        path: "/admin/dashboard",
        element: <PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  // Add an unauthorized page if you want
  // { path: "/unauthorized", element: <UnauthorizedPage /> },
]);

export default router;