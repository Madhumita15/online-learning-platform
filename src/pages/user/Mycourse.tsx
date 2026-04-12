import { useEffect } from "react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getAllenrollCourse } from "../../stores/slices/enrollment.slice";
import { toast } from "sonner";
import { getCoursesByIds } from "../../stores/slices/course.slice";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnimation from "../../services/json/lottie/Loading animation.json";

const Mycourse = () => {
  const { user } = useAppSeletor((state) => state.auth);
  const { allEnrollCourse } = useAppSeletor((state) => state.enrollment);
  const { myCourse, loading } = useAppSeletor((state) => state.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allEnrollCourse.length > 0) {
      const ids = allEnrollCourse?.map((enroll) => enroll.courseId);
      dispatch(getCoursesByIds({ courseIds: ids }));
    }
  }, [allEnrollCourse, dispatch]);

  useEffect(() => {
    if (!user.userId) {
      toast.error("Please login to show enrolled course");
      return;
    }
    dispatch(getAllenrollCourse({ userId: user.userId }));
  }, [dispatch, user.userId]);

  return (
    <>
      {loading && allEnrollCourse.length !== 0 ? (
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Your Courses
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full"></div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-5 max-w-4xl mx-auto">
            {myCourse.length === 0 ? (
              <p className="text-2xl font-bold">No Enrolled Course</p>
            ) : (
              myCourse?.map((enroll) => (
                <div
                  key={enroll.$id}
                  className="w-full sm:w-[90%] lg:w-[85%] bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-lg lg:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-md">
                        <img
                          src={enroll.image}
                          alt={enroll.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                        {enroll.title}
                      </h2>
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{enroll.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <button
                        className={`w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 transform active:scale-95 
                    bg-gradient-to-r from-blue-600 to-pink-600 text-white shadow-lg scale-105 hover:from-pink-600 hover:to-blue-600
                    
                  `}
                      >
                        Enrolled
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Mycourse;
