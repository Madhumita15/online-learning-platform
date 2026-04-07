import { useEffect } from "react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getMyBlog } from "../../stores/slices/blog.slice";
import { getMyCourse } from "../../stores/slices/course.slice";
import {
  BookOpen,
  CircleDotDashed,
  ClipboardClock,
  MessageSquare,
  TrendingUp,
  Zap,
} from "lucide-react";

const InstructorDashboard = () => {
  const { blogList } = useAppSeletor((state) => state.blog);
  const { courselist } = useAppSeletor((state) => state.course);
  const dispatch = useAppDispatch();

  const coursePendingCount = courselist?.filter(
    (course) => course.approveStatus === "pending",
  ).length;

  const blogPendingCount = blogList.filter((blog)=> blog.status === "pending").length


  useEffect(() => {
    dispatch(getMyBlog({ all: true }));
    dispatch(getMyCourse({ all: true }));
  }, [dispatch]);
  return (
    <div className=" p-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950">
            Instructor Dashboard
          </h1>
        </div>
        <p className="text-slate-800 text-sm ml-12">
          Welcome back! Here&apos;s your learning platform overview.
        </p>
      </div>

      <div className="flex flex-row gap-6">
        <div className="relative overflow-hidden w-[550px] rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Courses
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {courselist?.length}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {(courselist?.length / 100) * 100}%
                </span>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-purple-600/50">
              <div className="text-white">
                <BookOpen size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        <div className="relative overflow-hidden w-[550px] rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-pink-500 to-pink-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Blogs For Admin Approve
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {blogList?.length}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {(blogList?.length / 100) * 100}%
                </span>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-pink-600/50">
              <div className="text-white">
                <MessageSquare size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 ">
        <div className="relative overflow-hidden w-full rounded-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-slate-700 to-slate-600">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                 Pending Course
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {coursePendingCount}
                </h2>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-slate-600/50">
              <div className="text-white">
                <ClipboardClock size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        
      </div>

      <div className="relative overflow-hidden w-full rounded-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                 Pending Blog For Admin Approve
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {blogPendingCount}
                </h2>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-blue-700/50">
              <div className="text-white">
                <CircleDotDashed size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        
      </div>
      </div>

      

    </div>
  );
};

export default InstructorDashboard;
