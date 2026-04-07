import { BookOpen, Heart, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { useEffect, useState } from "react";
import {
  checkEnrollment,
  enrollCourse,
} from "../../stores/slices/enrollment.slice";

const SingleCourse = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAppSeletor((state) => state.auth);
  const location = useLocation();
  const data = location.state;
  const shorDesc = data.description.slice(0, 20);
  // console.log("user", user);
  const { isEnrolledMap } = useAppSeletor((state) => state.enrollment);
  const dispatch = useAppDispatch();

  const isEnrolled = isEnrolledMap[data.$id] === true;
  const isLoggedIn = !!user.userId;

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleEnrollment = async (courseId: string) => {
    try {
      await dispatch(
        enrollCourse({ courseId: courseId, userId: user.userId }),
      ).unwrap();
    } catch {
      console.log("Enrollment failed");
    }
  };

  useEffect(() => {
    if (!user.userId) return;
    dispatch(checkEnrollment({ courseId: data.$id, userId: user.userId }));
  }, [dispatch, data.$id, user.userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 text-balance">
            {data.title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap items-center justify-center   gap-8 mb-8">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute  inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
              <img
                src={data.image}
                alt={data.title}
                className="relative w-full md:w-[360px] lg:w-[750px]  h-[400px] rounded-2xl shadow-2xl object-cover group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          <div className="flex flex-col justify-center   space-y-7">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                Course Price
              </p>
              <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                ₹{data.price}
              </p>
              <p className="text-slate-500 text-sm">
                Limited time offer • Lifetime access
              </p>
            </div>

            <div className="bg-white rounded-2xl  p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                Language
              </p>
              <div className="flex items-center space-x-2">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold rounded-full text-sm">
                  {data.language}
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-1">
              <button
                disabled={isEnrolled && isLoggedIn}
                onClick={() => handleEnrollment(data.$id)}
                className="group gap-2 flex items-center justify-center flex-row relative w-[150px] h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span className="relative">
                  {isEnrolled ? "Enrolled" : "Enroll Now"}
                </span>
              </button>

              <button
                onClick={toggleWishlist}
                className={`group gap-1 flex items-center justify-center  flex-row w-[200px] relative h-14 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  isWishlisted
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    : "bg-white border-2 border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Heart
                  className={`mr-2 h-5 w-5 transition-all duration-300 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
                <span className="relative">
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full ">
          {isEnrolled ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="text-pink-900" /> Course Description
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"></div>
              <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl mt-24  shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
              <p className="text-slate-700 text-lg mb-4">{shorDesc}...</p>
              <p className="text-slate-600 text-base mb-6 font-semibold">
                Please enroll to see the full course details
              </p>
              <button
                disabled={isEnrolled && isLoggedIn}
                onClick={() => handleEnrollment(data.$id)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Enroll to Continue
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-200 hover:border-blue-400 transition-all duration-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Ready to transform your career?
            </h3>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who have completed this
              course and landed their dream jobs.
            </p>
            <button
              disabled={isEnrolled === true}
              onClick={() => handleEnrollment(data.$id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
