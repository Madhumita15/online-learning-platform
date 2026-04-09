import { ArrowDown, ArrowRight, ArrowUp, Search, User } from "lucide-react";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getAllCourse } from "../../stores/slices/course.slice";
import Lottie from "lottie-react";
import loadingAnimation from "../../services/json/lottie/Loading animation.json";
import { getAllCategory } from "../../stores/slices/category.slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import noDataAnimation from "../../services/json/lottie/Not Found.json";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [input, setInput] = useState("");
  const [sortCourse, setSortCourse] = useState("");
  const { courselist, loading } = useAppSeletor((state) => state.course);
  const { allCatagories } = useAppSeletor((state) => state.category);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredCourse = courselist?.filter((course) => {
    const isApproved =
      course.approveStatus === "approved" && course.status === "published";
    const isCategory =
      selectedCategory === "All Courses" ||
      course.categoryName?.toLowerCase() === selectedCategory.toLowerCase();
    const searchParams = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const searchInput = course.title
      .toLowerCase()
      .includes(input.toLowerCase());
    return isApproved && isCategory && searchInput && searchParams;
  });

  const sortedCourses = [...(filteredCourse || [])].sort((a, b) =>
    sortCourse === "asc"
      ? a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      : b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
  );

  useEffect(() => {
    dispatch(getAllCategory({ all: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourse({ all: true }));
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="lg">
        <div className="flex flex-col mb-32 ">
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row items-center mt-20 justify-between border-b-2 pb-10">
            <div className="flex flex-row items-center border-2 shadow-md rounded-3xl p-2 w-full md:w-[300px] lg:w-[400px]  justify-between hover:bg-slate-100">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder="Search for courses..."
                className="outline-none bg-transparent text-lg"
              />
              <Search className="text-purple-700" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={() => setSortCourse("asc")}
                className="bg-gradient-to-r from-purple-500  to-pink-500 flex flex-row items-center gap-2"
                variant="contained"
              >
                Sort by Ascending <ArrowUp />
              </Button>
              <Button
                onClick={() => setSortCourse("desc")}
                className="bg-gradient-to-r from-purple-500  to-orange-500 flex flex-row items-center gap-2"
                variant="contained"
              >
                Sort by Descending <ArrowDown />
              </Button>
            </div>
          </div>

          {/*category section */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-10">
            <button
              onClick={() => setSelectedCategory("All Courses")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition duration-300 ${
                selectedCategory === "All Courses"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Courses
            </button>
            {allCatagories.map((category) => (
              <button
                key={category.$id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition duration-300 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/*course section */}
          {loading ? (
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
          ) : (
            <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-4 justify-center mt-20">
              {sortedCourses.length > 0 ? (
                sortedCourses?.map((course) => (
                  <div
                    key={course.$id}
                    className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(30%-15px)] bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                      <div className="absolute inset-0 group-hover:scale-110 transition duration-300 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-300"
                        />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 space-y-3">
                      <h3 className="font-bold text-slate-900 line-clamp-2 text-sm sm:text-base">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                        <User className="w-4 h-4" />
                        <span>{course.instructorName}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-bold text-blue-600">
                          ${course.price}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/singleCourse/${course.$id}`)
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition text-xs sm:text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
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
                    className="w-[500px]"
                  />
                </Box>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Apply Section */}
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

export default Courses;
