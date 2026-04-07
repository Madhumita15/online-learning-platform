import { ArrowRight, User, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slider";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getAllCategory } from "../../stores/slices/category.slice";
import { getAllCourse } from "../../stores/slices/course.slice";
import { getAllInstructor } from "../../stores/slices/instructor.slice";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import noDataAnimation from "../../services/json/lottie/Not Found.json";
import loadingAnimation from "../../services/json/lottie/Loading animation.json";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const { instructorList, InstructorLoading } = useAppSeletor(
    (state) => state.instructor,
  );
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { courselist, loading } = useAppSeletor((state) => state.course);
  const { allCatagories } = useAppSeletor((state) => state.category);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filteredCourse = courselist?.filter((course) => {
    const isApprove =
      course.approveStatus === "approved" && course.status === "published";
    const isCategory =
      selectedCategory === "All Courses" ||
      course.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

    return isApprove && isCategory;
  });

  const allInstructor = instructorList?.filter(
    (instructor) => instructor.status === "approved",
  );

  useEffect(() => {
    dispatch(getAllCourse({ all: true }));
    dispatch(getAllCategory({ all: true }));
    dispatch(getAllInstructor({ all: true }));
  }, [dispatch]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div
            className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
            style={{ maxWidth: "1440px" }}
          >
            <div className="text-center space-y-6 sm:space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Learn From Industry Experts
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Potential
                </span>{" "}
                Today
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                Join thousands of students learning from expert instructors
                across web development, design, business, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => navigate("/courses")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition duration-300"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => navigate("/courses")}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-blue-500 hover:bg-blue-50 transition duration-300"
                >
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div
            className="mx-auto px-4 sm:px-6 lg:px-8"
            style={{ maxWidth: "1440px" }}
          >
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Browse Our Courses
                </h2>
                <p className="text-slate-600">
                  Discover a wide range of courses from top instructors
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
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
                {allCatagories?.map((category) => (
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
                <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6 justify-center">
                  {filteredCourse?.length > 0 ? (
                    filteredCourse?.slice(0, 6).map((course) => (
                      <div
                        key={course.$id}
                        className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(30%-15px)] bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
                      >
                        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                          <div className="absolute inset-0 group-hover:scale-140 transition duration-300 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
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
                                navigate(`/singleCourse/${course.$id}`, {
                                  state: course,
                                })
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
                        className="w-[470px]"
                      />
                    </Box>
                  )}
                </div>
              )}

              <div className="flex justify-center pt-6">
                <NavLink to="/courses">
                  <button className="flex items-center gap-2 px-8 py-3 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                    View all courses
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div
            className="mx-auto px-4 sm:px-6 lg:px-8"
            style={{ maxWidth: "1440px" }}
          >
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Popular Instructors
                </h2>
                <p className="text-slate-600">
                  Learn from the best educators in the industry
                </p>
              </div>

              {InstructorLoading ? (
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
                <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6 justify-center">
                  {allInstructor?.map((instructor) => (
                    <div
                      key={instructor.$id}
                      className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 text-center space-y-6"
                    >
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-3xl font-bold">
                          {instructor.name.slice(0, 1)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {instructor.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1 text-yellow-400">
                          <Award className="w-4 h-4" />
                          <span className="text-sm text-slate-600">
                            Top Instructor
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 py-4 border-t border-b border-slate-200">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {instructor.experience}
                          </p>
                          <p className="text-xs text-slate-600">Experience</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-purple-600">
                            {instructor.skills}
                          </p>
                          <p className="text-xs text-slate-600">Skills</p>
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition duration-300">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div
            className="mx-auto px-4 sm:px-6 lg:px-8"
            style={{ maxWidth: "1440px" }}
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-8 sm:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Get Amazing Discounts
                  </h2>
                  <p className="text-white text-opacity-90 text-base sm:text-lg">
                    Subscribe to our newsletter and get exclusive access to
                    discounts, new courses, and special offers.
                  </p>
                </div>
                <form
                  onSubmit={handleSubscribe}
                  className="flex-1 w-full flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg focus:outline-none text-slate-900 placeholder-slate-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition duration-300 whitespace-nowrap"
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>
              </div>
              {subscribed && (
                <div className="mt-6 text-center text-white font-semibold animate-pulse">
                  ✓ Thank you for subscribing!
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
