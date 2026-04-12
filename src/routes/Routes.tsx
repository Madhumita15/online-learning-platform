import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Blog from "../pages/user/Blog";
import Contact from "../pages/user/Contact";
import UserWrapper from "../layout/userLayout/UserWrapper";
import Courses from "../pages/user/Courses";
import InstructorForm from "../pages/user/InstructorForm";
import Cart from "../pages/user/Cart";
import AdminWrapper from "../layout/adminLayout/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import AdminBlog from "../pages/admin/AdminBlog";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminCategory from "../pages/admin/AdminCategory";
import AdminUser from "../pages/admin/AdminUser";
import ProtectedRoutes from "../components/ProtectedRoutes";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorBlog from "../pages/instructor/InstructorBlog";
import InstructorCourse from "../pages/instructor/InstructorCourse";
import UserInstructor from "../pages/user/UserInstructor";
import SingleCourse from "../pages/user/SingleCourse";
import InstructorRequest from "../pages/admin/InstructorRequest";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/showinstructor",
        element: <UserInstructor />,
      },
      {
        path: "/becomeinstructor",
        element: <InstructorForm />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/singleCourse/:id",
        element: <SingleCourse />
      }
      
    ],
  },
  {
    path: "/admin/",
    element: <ProtectedRoutes allowedRole={["admin"]}/>,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "adminblog",
            element: <AdminBlog />,
          },
          {
            path: "admincourse",
            element: <AdminCourses />,
          },
          {
            path: "instructorrequest",
            element: <InstructorRequest />,
          },
          {
            path: "admincategory",
            element: <AdminCategory />,
          },
          {
            path: "user",
            element: <AdminUser />,
          },
          
        ],
      },
    ],
  },
  {
    path: "/instructor/",
    element: <ProtectedRoutes allowedRole={["instructor"]}/>,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <InstructorDashboard />,
          },
          {
            path: "instructorblog",
            element: <InstructorBlog />,
          },
          {
            path: "instructorcourse",
            element: <InstructorCourse />,
          },
          
        ],
      },
    ],
  },

]);
export default routes;
