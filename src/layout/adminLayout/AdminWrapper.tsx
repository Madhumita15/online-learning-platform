import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ScrollToTop from "../../components/ScrollToTop";

const AdminWrapper = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[20%] h-screen bg-gradient-to-r from-purple-950 to-blue-950 text-white fixed left-0 top-0 z-50">
          <Sidebar />
        </div>

        <div className="ml-[20%] w-[80%] flex flex-col">
          <div className="p-5 bg-gradient-to-r  from-purple-950 to-blue-950 text-white sticky top-0 z-40 shadow-2xl">
            <Navbar />
          </div>
          <div className="p-5  h-screen  bg-fuchsia-100 overflow-y-auto" >
            <ScrollToTop />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
