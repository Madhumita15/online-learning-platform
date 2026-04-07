import { Search } from "lucide-react";
import { useAppSeletor } from "../../services/helper/redux";
import { useState } from "react";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import noDataAnimation from "../../services/json/lottie/Not Found.json";
import loadingAnimation from "../../services/json/lottie/Loading animation.json";

const UserInstructor = () => {
  const [search, setSearch] = useState<string>("");

  const { instructorList, InstructorLoading } = useAppSeletor(
    (state) => state.instructor,
  );
  const allInstructor = instructorList?.filter((instructor) => {
    const isApproved = instructor.status === "approved";
    const includes = instructor.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return isApproved && includes;
  });

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-8 sm:py-12 lg:py-16">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
        style={{ maxWidth: "1200px" }}
      >
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 bg-gradient-to-r from-purple-600  to-pink-600 bg-clip-text text-transparent">
            Our Instructors
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 mt-2">
            Learn from industry experts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
          <div className="flex-1 relative">
            <div className="flex items-center bg-white border-2 border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 hover:border-purple-400 hover:shadow-md transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 mr-2" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="instructor"
                id="instructor"
                placeholder="Search by name..."
                className="outline-none bg-transparent flex-1 text-xs sm:text-sm lg:text-base text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
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
          <div className="flex flex-wrap gap-4 sm:gap-4 lg:gap-6 justify-start">
            {allInstructor?.length > 0 ? (
              allInstructor?.map((item) => (
                <div
                  key={item.$id}
                  className="w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-18px)] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-slate-200 hover:border-purple-300 flex flex-col"
                >
                  <div className="relative overflow-hidden bg-slate-300 h-96 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
                    <span className="text-xs sm:text-xs lg:text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full w-fit mb-2 sm:mb-3">
                      {item.skills}
                    </span>

                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors duration-300">
                      {item.name}
                    </h2>

                    <button className="mt-3 sm:mt-4 w-full px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-500 hover:shadow-lg transition-all duration-300">
                      View Profile
                    </button>
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
      </div>
    </div>
  );
};

export default UserInstructor;
