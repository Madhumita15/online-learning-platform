import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ID, tablesDB } from "../../lib/appwrite.config";
import { Permission, Query, Role } from "appwrite";
import { toast } from "sonner";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { EnrollmentInitialState } from "../../typescript/interface/enrollment.interface";

const initialState: EnrollmentInitialState = {
  loading: false,
  error: null,
  isEnrolledMap: {},
};

export const enrollCourse = createAsyncThunk<
  { courseId: string; userId: string },
  { courseId: string; userId: string | null },
  { rejectValue: ErrorResponse }
>("enroll/course", async ({ courseId, userId }, { rejectWithValue }) => {
  try {
    //check login or not login
    if (!userId) {
      toast.success("Please Lgin first to continue enrollment process");
      return rejectWithValue({
        success: false,
        message: "Failed to enroll",
      });
    }

    //check duplicate enrollment
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
      return {
        courseId,
        userId,
      };
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
  reducers: {},
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
      });
  },
});

export default enrollmentSlice.reducer;
