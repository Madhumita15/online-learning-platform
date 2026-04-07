import {
  Award,
  BookOpen,
  CircleDotDashed,
  GraduationCap,
  Layers,
  ListChecks,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { useEffect } from "react";
import { getAllCourse } from "../../stores/slices/course.slice";
import { getAllBlog } from "../../stores/slices/blog.slice";
import { getAllCategory } from "../../stores/slices/category.slice";
import { getAllInstructor } from "../../stores/slices/instructor.slice";
import { getAllUsers } from "../../stores/slices/user.slice";

const Dashboard = () => {
  const { userList } = useAppSeletor((state) => state.user);
  const { courselist } = useAppSeletor((state) => state.course);
  const { instructorList } = useAppSeletor((state) => state.instructor);
  const { allCatagories } = useAppSeletor((state) => state.category);
  const { blogList } = useAppSeletor((state) => state.blog);
  const dispatch = useAppDispatch();


  const coursPendingRequest = courselist?.filter((course)=> course.approveStatus === "pending").length
  const blogPendingRequest = blogList?.filter((blog)=> blog.status === "pending").length
  const instructorPendingRequest = instructorList?.filter((instructor)=> instructor.status === "pending").length
  
  
 

  useEffect(() => {
    dispatch(getAllCourse({ all: true }));
    dispatch(getAllBlog({ all: true }));
    dispatch(getAllCategory({ all: true }));
    dispatch(getAllInstructor({ all: true }));
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className=" p-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950">Admin Dashboard</h1>
        </div>
        <p className="text-slate-800 text-sm ml-12">
          Welcome back! Here&apos;s your learning platform overview.
        </p>
      </div>

      <div className="flex flex-row gap-6">
        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Users
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {userList?.length || 0} 
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {Math.round((userList?.length / 100) * 100 || 0)}%
                </span>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-blue-600/50">
              <div className="text-white">
                <Users size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Courses
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {courselist?.length || 0}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {Math.round((courselist?.length / 100) * 100 || 0)}%
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

        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-emerald-500 to-emerald-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Instructors
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {instructorList?.length || 0}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {Math.round((instructorList?.length / 100) * 100 || 0)}%
                </span>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-emerald-600/50">
              <div className="text-white">
                <GraduationCap size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-orange-500 to-orange-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Categories
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {allCatagories?.length || 0}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {Math.round((allCatagories?.length / 100) * 100) || 0}%
                </span>
              </div>
            </div>
            <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-orange-600/50">
              <div className="text-white">
                <Layers size={28} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-pink-500 to-pink-700">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Total Blogs
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-white">
                  {blogList?.length || 0}
                </h2>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-300">
                  <TrendingUp size={16} />
                  {Math.round((blogList?.length / 100) * 100) || 0}%
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

      <div className="mt-12 flex flex-row gap-9">
      
        <div className="rounded-2xl w-[60%] bg-gradient-to-br from-slate-700 to-slate-800 p-8 backdrop-blur-sm border border-slate-600/20 hover:border-slate-500/40 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award size={24} className="text-indigo-400" />
              Course Progress Overview
            </h3>
          </div>

          <div className="space-y-6">
            {allCatagories &&
              allCatagories?.map((category) => {
                const count =
                  courselist?.filter(
                    (course) =>
                      course.categoryName?.toLowerCase() ===
                      category.name?.toLowerCase(),
                  ).length || 0;

                const percentage = courselist?.length
                  ? Math.round(Math.round((count / courselist?.length) * 100 || 0))
                  : 0;
                return (
                  <div key={category.$id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">
                        {category?.name}
                      </span>
                      <span className="text-sm font-bold text-indigo-400">
                        {percentage}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-400/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div>
            <h1 className="text-2xl font-bold text-pink-900 flex items-center gap-3"><ListChecks size={28} /> Pending Request</h1>
          <div className="relative mt-2 overflow-hidden w-[400px] rounded-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-pink-900 to-pink-800">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                   Blog Request 
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-white">{blogPendingRequest || 0}</h2>
                </div>
              </div>
              <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-pink-700/50">
                <div className="text-white">
                  <CircleDotDashed size={28} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>

          <div className="relative mt-2 overflow-hidden w-[400px] rounded-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-orange-900 to-orange-800">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                   Course Request 
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-white">{coursPendingRequest || 0}</h2>
                </div>
              </div>
              <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-orange-700/50">
                <div className="text-white">
                  <CircleDotDashed size={28} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange/40 to-transparent"></div>
          </div>

          <div className="relative mt-2 overflow-hidden w-[400px] rounded-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-red-900 to-red-800">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-10 bg-white"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                   Instructor Request 
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-white">{instructorPendingRequest || 0}</h2>
                </div>
              </div>
              <div className="rounded-xl p-4 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 bg-red-700/50">
                <div className="text-white">
                  <CircleDotDashed size={28} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
