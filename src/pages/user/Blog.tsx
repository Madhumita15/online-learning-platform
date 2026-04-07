import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import blog1 from "../../assets/Frame 501 (1).png";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getAllBlog } from "../../stores/slices/blog.slice";
import noDataAnimation from "../../services/json/lottie/Not Found.json";
import loadingAnimation from '../../services/json/lottie/Loading animation.json'
import Lottie from "lottie-react";
import { Box } from "@mui/material";

const Blog = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>("");
  const { blogList, loading } = useAppSeletor((state) => state.blog);
  const allBlog = blogList?.filter((blog) => {
    const isApproved = blog.status === "approved";
    const searchName = blog.title.toLowerCase().includes(input.toLowerCase());
    return isApproved && searchName;
  });

  useEffect(() => {
    dispatch(getAllBlog({ all: true }));
  }, [dispatch]);

  return (
    <>
      <div>
        <img src={blog1} alt="blog&stories" className="w-full h-96" />
      </div>

      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
        style={{ maxWidth: "1200px" }}
      >
        <div className="flex flex-col mt-8 sm:mt-12 lg:mt-20">
          <div className="flex justify-center items-center mb-8 sm:mb-10 lg:mb-10">
            <div className="flex flex-row items-center border-2 border-slate-300 shadow-md rounded-full px-4 sm:px-5 py-2 sm:py-3 w-full sm:w-80 lg:w-96 bg-white hover:shadow-lg hover:border-purple-400 transition-all duration-300">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder="Search for blog & stories..."
                className="outline-none bg-transparent text-xs sm:text-sm lg:text-base flex-1 text-slate-800 placeholder-slate-500"
              />
              <Search className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {
            loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lottie
                loop={true}
                animationData={loadingAnimation}
                className="w-[470px]"
              />
            </Box>
          ) : 
          <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-3 justify-start mb-12 sm:mb-16 lg:mb-20">
            {allBlog.length > 0 ? (
              allBlog.map((blog) => (
                <div
                  key={blog.$id}
                  className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-12px)] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-slate-200 hover:border-purple-300"
                >
                  <div className="relative overflow-hidden bg-slate-200 h-40 sm:h-48 lg:h-56">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 sm:p-4 lg:p-5">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-xs sm:text-xs lg:text-sm font-semibold text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                        {blog.title}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 mb-2 sm:mb-3 line-clamp-2 hover:text-purple-600 transition-colors duration-300">
                      {blog.content}
                    </h2>

                    <div className="pt-2 sm:pt-3 border-t border-slate-200">
                      <p className="text-xs sm:text-sm lg:text-sm text-slate-600 font-medium">
                        By {blog.title}
                      </p>
                    </div>

                    <NavLink
                      to="#"
                      className="text-purple-600 hover:text-blue-600 font-semibold text-xs sm:text-sm mt-3 sm:mt-4 inline-flex items-center gap-1 transition-colors duration-300"
                    >
                      Read More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lottie
                  loop={true}
                  animationData={noDataAnimation}
                  className="w-[470px]"
                />
              </Box>
            )}
          </div>
          }

          
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-blue-100 mb-1 sm:mb-2">
              COURSES FOR FREE, REGISTER NOW
            </p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              CREATIVE IN RESEARCH AND TEACHING
            </h1>
          </div>
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-slate-100 hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
            Apply Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;
