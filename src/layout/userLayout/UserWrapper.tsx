import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";

const UserWrapper = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserWrapper;
