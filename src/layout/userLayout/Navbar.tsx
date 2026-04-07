import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "@mui/material";
import FormDialog from "../../components/FormDialog";
import { signupConfig } from "../../services/config/signup.config";
import { loginConfig } from "../../services/config/login.config";
import type { FormConfig } from "../../typescript/interface/form.interface";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { logoutUser } from "../../stores/slices/auth.slice";
import { toast } from "sonner";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<FormConfig | null>(null);
  const { user } = useAppSeletor((state) => state.auth);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/courses?search=${query}`);
  };

  const navlinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/courses", name: "All Courses" },
    { path: "/showinstructor", name: "Instructors" },
    { path: "/blog", name: "Blog & stories" },
    { path: "/contact", name: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  

  const handleLogout = async () => {
    try {
      
    await dispatch(logoutUser()).unwrap()

    } catch  {
      toast.error("Failed to Logout")

    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-200 via-purple-100 to-slate-300  shadow-xl border-b border-slate-200 ">
      {/* Main navbar container */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "1440px" }}
      >
        <Container maxWidth="xl">
          <div className="flex flex-col">
            {/* Top section: Logo, Search, Actions */}
            <div className="flex flex-row items-center justify-between py-3 sm:py-4 lg:py-5">
              {/* Logo */}
              <NavLink to="/">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                    <span className="text-lg font-bold text-white">E</span>
                  </div>
                  <span className="text-2xl sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                    dustack
                  </span>
                </div>
              </NavLink>

              {/* Search bar - hidden on mobile */}
              <div className="hidden md:flex items-center bg-slate-100 hover:bg-slate-200 rounded-full px-4 py-2 transition border-2 border-purple-200 duration-300 shadow-sm">
                <input
                  type="text"
                  onChange={(e)=> setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search courses..."
                  className="bg-transparent text-slate-800 placeholder-slate-500  focus:outline-none text-sm w-40 lg:w-56"
                />
                <Search className="w-5 h-5 text-slate-600 cursor-pointer hover:text-blue-600 transition duration-300" />
              </div>

              {/* Right actions - Desktop */}
              <div className="hidden lg:flex flex-row items-center gap-2">
                <NavLink to="/becomeinstructor">
                  <button className="px-4 py-2 text-slate-700 font-bold hover:text-blue-600 transition duration-300 text-sm">
                    Become instructor
                  </button>
                </NavLink>
                <NavLink to="/cart">
                  <button className="relative p-2 rounded-lg hover:bg-slate-100 transition duration-300">
                    <ShoppingCart className="w-6 h-6 text-slate-700 hover:text-blue-600" />
                  </button>
                </NavLink>
                <div className="border-l border-slate-300 pl-2 ml-2 flex gap-2">
                  {user && user.userId ? (
                    <button type="button" onClick={handleLogout}>Logout</button>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 text-slate-700  font-bold hover:text-blue-600 transition duration-300 text-sm"
                        onClick={() => {
                          setOpen(true);
                          setConfig(loginConfig);
                        }}
                      >
                        Login
                      </button>

                      <button
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg  font-bold hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 text-sm"
                        onClick={() => {
                          setOpen(true);
                          setConfig(signupConfig);
                        }}
                      >
                        Sign up
                      </button>

                      {config && (
                        <FormDialog
                          open={open}
                          setOpen={setOpen}
                          config={config}
                          setConfig={setConfig}
                          from={location.pathname}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>
            </div>

            {/* Navigation links - Desktop */}
            <div className="hidden lg:flex flex-row gap-1 pb-1 ">
              {navlinks.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  <button className="px-4 py-2 text-slate-700 font-bold  hover:text-blue-600 hover:bg-blue-100 rounded-lg transition duration-300 text-sm">
                    {link.name}
                  </button>
                </NavLink>
              ))}
            </div>
          </div>
        </Container>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-slate-300 mt-3 animate-in fade-in duration-200">
            {/* Mobile search */}
            <div className="flex items-center bg-slate-200 rounded-lg px-3 py-2 mb-3 shadow-sm">
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm w-full"
              />
              <Search className="w-5 h-5 text-slate-600" />
            </div>

            {/* Mobile nav links */}
            <div className="flex flex-col gap-2 mb-3">
              {navlinks.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-4 py-3 text-slate-700  font-bold hover:text-blue-600 hover:bg-blue-100 rounded-lg transition duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </NavLink>
              ))}
            </div>

            {/* Mobile action buttons */}
            <div className="flex flex-col gap-2 border-t border-slate-200 pt-3">
              <NavLink to="/becomeinstructor">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2 text-slate-700  font-bold hover:text-blue-600 hover:bg-blue-100 rounded-lg transition duration-300 text-sm"
                >
                  Become instructor
                </button>
              </NavLink>
              <NavLink to="/cart">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700  font-bold hover:text-blue-600 hover:bg-blue-100 rounded-lg transition duration-300 text-sm"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                </button>
              </NavLink>

               {user && user.userId ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 text-slate-700  font-bold hover:text-blue-600 transition duration-300 text-sm"
                        onClick={() => {
                          setOpen(true);
                          setConfig(loginConfig);
                        }}
                      >
                        Login
                      </button>

                      <button
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg  font-bold hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 text-sm"
                        onClick={() => {
                          setOpen(true);
                          setConfig(signupConfig);
                        }}
                      >
                        Sign up
                      </button>

                      {config && (
                        <FormDialog
                          open={open}
                          setOpen={setOpen}
                          config={config}
                          setConfig={setConfig}
                        />
                      )}
                    </>
                  )}

              {/* <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpen(true);
                  setConfig(loginConfig);
                }}
                className="w-full px-4 py-2 text-slate-700  font-bold hover:text-blue-600 hover:bg-blue-100 rounded-lg transition duration-300 text-sm"
              >
                Login
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpen(true);
                  setConfig(signupConfig);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg  font-bold hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 text-sm"
              >
                Sign up
              </button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
