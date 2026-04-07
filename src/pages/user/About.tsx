import image1 from "../../assets/Frame 432.png";
import image2 from "../../assets/Frame 431.png";
import image3 from "../../assets/Frame 433.png";
import image4 from "../../assets/Frame 434.png";
import image5 from "../../assets/Frame 449.png";
import image6 from "../../assets/image 1.png";
import { useAppSeletor } from "../../services/helper/redux";
const About = () => {
  const { instructorList } = useAppSeletor((state) => state.instructor);
  const allInstructor = instructorList?.filter(
    (instructor) => instructor.status === "approved",
  );
  

  return (
    <>
      <div className="pb-12 sm:pb-20 lg:pb-36 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="flex flex-col lg:ml-[190px] pt-12 sm:pt-24 lg:pt-36 px-4 sm:px-6 lg:px-0">
          <div className="w-full sm:w-4/5 lg:w-[680px] lg:ml-60">
            <h1 className="font-bold text-center text-xl sm:text-2xl lg:text-3xl leading-relaxed text-slate-900">
              Our goal is to develop and meet the needs of each child so that he
              or she becomes a well-rounded tomorrow individual.
            </h1>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start mt-8 sm:mt-16 lg:mt-36 lg:ml-44 gap-2 sm:gap-3 lg:gap-4">
            <img
              src={image1}
              alt="image1"
              className="w-28 h-32 sm:w-40 sm:h-48 lg:w-[180px] lg:h-[200px] rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
            <img
              src={image2}
              alt="image2"
              className="w-28 h-32 sm:w-48 sm:h-56 lg:w-[230px] lg:h-[250px] lg:mt-[-30px] rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
            <img
              src={image3}
              alt="image3"
              className="w-28 h-32 sm:w-40 sm:h-48 lg:w-[180px] lg:h-[200px] rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
            <img
              src={image4}
              alt="image4"
              className="w-28 h-32 sm:w-40 sm:h-48 lg:w-[180px] lg:h-[200px] rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-row text-white justify-around font-bold lg:ml-[180px] gap-3 sm:gap-4 lg:gap-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 sm:p-8 lg:p-9 mt-8 sm:mt-16 lg:mt-20 w-full sm:w-full lg:w-[820px] shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex flex-col items-center flex-1 sm:flex-1 lg:flex-none">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                2K
              </h1>
              <p className="text-xs sm:text-sm lg:text-base mt-1">Students</p>
            </div>
            <div className="flex flex-col items-center flex-1 sm:flex-1 lg:flex-none">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                30
              </h1>
              <p className="text-xs sm:text-sm lg:text-base mt-1">Professors</p>
            </div>
            <div className="flex flex-col items-center flex-1 sm:flex-1 lg:flex-none">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                6K
              </h1>
              <p className="text-xs sm:text-sm lg:text-base mt-1">Programs</p>
            </div>
            <div className="flex flex-col items-center flex-1 sm:flex-1 lg:flex-none">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                2K
              </h1>
              <p className="text-xs sm:text-sm lg:text-base mt-1">Research</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 mt-6 sm:mt-8 lg:mt-7 p-6 sm:p-8 lg:p-11 flex flex-col shadow-lg">
          <div className="flex flex-col sm:flex-row justify-around text-white gap-6 sm:gap-4">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-center sm:text-left">
              2026
            </h1>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-center sm:text-left">
              1996
            </h1>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-center sm:text-left">
              2005
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-16 lg:mt-20 lg:ml-[480px] px-4 sm:px-0">
            <img
              src={image5}
              alt="image5"
              className="w-full sm:w-40 sm:h-32 lg:w-[200px] lg:h-[150px] rounded-lg object-cover"
            />
            <div className="text-white w-full sm:w-auto lg:w-[300px]">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                15 New Courses Added
              </h3>
              <p className="mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum doloribus omnis eaque voluptatem nemo in quam ab
                doloremque, deserunt obcaecati!
              </p>
            </div>
          </div>
        </div>

        <div className="lg:ml-[350px] flex flex-col lg:flex-row gap-8 sm:gap-16 lg:gap-36 mt-8 sm:mt-12 lg:mt-14 px-4 sm:px-6 lg:px-0">
          <img
            src={image6}
            alt="image6"
            className="w-full sm:w-3/4 lg:w-auto lg:h-[300px] rounded-lg shadow-md object-cover mx-auto sm:mx-auto lg:mx-0"
          />
          <div className="flex flex-col w-full sm:w-3/4 mx-auto lg:mx-0 lg:w-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-slate-900">
                Mission and values
              </h1>
              <p className="text-xs sm:text-sm lg:text-sm text-slate-700 mt-3 leading-relaxed">
                We prepare you to launch your career by providing a supportive,
                creative, and professional. Our mission is to prepare students
                to understand, contribute to, and succeed in a rapidly changing
                society,
              </p>
            </div>

            <div className="w-full lg:w-[480px] flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10 bg-gradient-to-br from-slate-100 to-blue-50 p-3 sm:p-4 lg:p-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-100 transition-all duration-300">
              <div className="flex flex-col space-y-2 flex-1">
                <h1 className="font-bold text-base sm:text-lg lg:text-lg text-slate-900">
                  Creativity
                </h1>
                <p className="text-xs sm:text-xs lg:text-xs text-slate-700 line-clamp-2 sm:line-clamp-3">
                  Encouraging behaviours which encompass notions of originality,
                  and problem-solving in all that we do.
                </p>
                <button className="text-white bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-2 rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 w-fit">
                  Learn More
                </button>
              </div>
              <img
                src={image2}
                alt="image2"
                className="w-full sm:w-32 sm:h-28 lg:w-auto lg:h-[150px] rounded-lg object-cover"
              />
            </div>

            <div className="w-full lg:w-[500px] flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-5 lg:mt-5 bg-gradient-to-br from-slate-100 to-purple-50 p-3 sm:p-4 lg:p-2 rounded-lg shadow-md hover:shadow-lg hover:from-purple-100 transition-all duration-300">
              <div className="flex flex-col space-y-2 flex-1">
                <h1 className="font-bold text-base sm:text-lg lg:text-lg text-slate-900">
                  Scholarship
                </h1>
                <p className="text-xs sm:text-xs lg:text-xs text-slate-700 line-clamp-2 sm:line-clamp-3">
                  Encouraging behaviours which encompass notions of originality,
                  and problem-solving in all that we do.
                </p>
                <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-2 rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 w-fit">
                  Learn More
                </button>
              </div>
              <img
                src={image3}
                alt="image3"
                className="w-full sm:w-32 sm:h-28 lg:w-auto lg:h-[150px] rounded-lg object-cover"
              />
            </div>

            <div className="w-full lg:w-[500px] flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-5 lg:mt-5 bg-gradient-to-br from-slate-100 to-pink-50 p-3 sm:p-4 lg:p-2 rounded-lg shadow-md hover:shadow-lg hover:from-pink-100 transition-all duration-300">
              <div className="flex flex-col space-y-2 flex-1">
                <h1 className="font-bold text-base sm:text-lg lg:text-lg text-slate-900">
                  Community
                </h1>
                <p className="text-xs sm:text-xs lg:text-xs text-slate-700 line-clamp-2 sm:line-clamp-3">
                  Encouraging behaviours which encompass notions of originality,
                  and problem-solving in all that we do.
                </p>
                <button className="text-white bg-gradient-to-r from-pink-600 to-blue-600 px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-2 rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg hover:from-pink-700 hover:to-blue-700 transition-all duration-300 w-fit">
                  Learn More
                </button>
              </div>
              <img
                src={image1}
                alt="image1"
                className="w-full sm:w-32 sm:h-28 lg:w-auto lg:h-[150px] rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:ml-[350px] mt-12 sm:mt-16 lg:mt-20 flex flex-wrap justify-center sm:justify-start lg:flex-row gap-3 sm:gap-4 lg:gap-2 px-4 sm:px-6 lg:px-0">
          {allInstructor?.map((instructor) => (
            <img
              src={instructor.image}
              alt="image"
              className="w-full sm:w-48 sm:h-40 lg:h-[290px] lg:w-[210px] rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 object-cover"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
