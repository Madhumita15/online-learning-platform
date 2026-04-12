import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ID, tablesDB } from "../../lib/appwrite.config";
import { Permission, Query, Role } from "appwrite";
import { toast } from "sonner";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { EnrollmentInitialState } from "../../typescript/interface/enrollment.interface";
import type { enrollResponseType } from "../../typescript/type/enrollment.type";



const initialState: EnrollmentInitialState = {
  loading: false,
  error: null,
  isEnrolledMap: {},
  allEnrollCourse: [],
};

export const getAllenrollCourse = createAsyncThunk<
{rows: enrollResponseType[], total: number},
{userId: string},
{rejectValue: ErrorResponse}
>(
  "enrol/getcourse",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "enrollment",
        queries: [Query.equal("userId", userId)]
      });

      const mappedCourses = response.rows?.map((course)=> ({
        courseId: course.courseId,
        userId: course.userId,
        paymentSuccess: course.paymentSuccess

      }
        
      ))
      return {
        rows: mappedCourses,
        total: response.total
      }
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed to getenroll",
      });
    }
  },
);

export const enrollCourse = createAsyncThunk<
  { courseId: string; userId: string },
  { courseId: string; userId: string | null },
  { rejectValue: ErrorResponse }
>("enroll/course", async ({ courseId, userId }, { rejectWithValue }) => {
  try {
    //check login or not login
    if (!userId) {
      toast.error("Please Lgin first to continue enrollment process");
      return rejectWithValue({
        success: false,
        message: "Failed to enroll",
      });
    }

    const existingUser = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "enrollment",
      queries: [
        Query.equal("userId", userId),
        Query.equal("courseId", courseId),
      ],
    });

    if (existingUser.rows.length > 0) {
      toast.success("You already enroll for this course");
      return rejectWithValue({
        success: false,
        message: "You already enrolled",
      });
    }

    //create enrollment
    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "enrollment",
      rowId: ID.unique(),
      data: {
        userId: userId,
        courseId: courseId,
        paymentStatus: "success",
      },
      permissions: [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ],
    });
    return {
      userId: response.userId,
      courseId: response.courseId,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Enrollment Failed",
    });
  }
});

export const checkEnrollment = createAsyncThunk<
  { courseId: string; isEnrolled: boolean },
  { courseId: string; userId: string | null },
  { rejectValue: ErrorResponse }
>("checkenroll/course", async ({ courseId, userId }, { rejectWithValue }) => {
  try {
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: "User not found",
      });
    }

    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "enrollment",
      queries: [
        Query.equal("userId", userId),
        Query.equal("courseId", courseId),
      ],
    });

    return {
      courseId,
      isEnrolled: response?.total > 0,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed to check enrollment",
    });
  }
});

const enrollmentSlice = createSlice({
  name: "enroll",
  initialState,
  reducers: {
    resetEnrollment: (state)=>{
      state.allEnrollCourse = []
      state.error = null
      state.isEnrolledMap = {}
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // console.log("action fullfilled", action.payload);
        if (action.payload) {
          toast.success("Enrolled Successfully!");
          const courseId = action.payload.courseId;
          state.isEnrolledMap[courseId] = true;
        }
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action rejected", action.payload);
        state.error = action.payload?.message as string;
      })
      .addCase(checkEnrollment.fulfilled, (state, action) => {
        if (action.payload) {
          const { courseId, isEnrolled } = action.payload;
          state.isEnrolledMap[courseId] = isEnrolled;
        }
      })
      .addCase(getAllenrollCourse.fulfilled, (state, action)=>{
        // console.log("action from enrollment process", action.payload)
        state.allEnrollCourse = action.payload.rows
      })
  },
});

export const {resetEnrollment} = enrollmentSlice.actions
export default enrollmentSlice.reducer;
