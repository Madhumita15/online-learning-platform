import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account, ID, storage, tablesDB } from "../../lib/appwrite.config";
import { Permission, Query, Role } from "appwrite";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { InstructorFormData, instructorInitialState } from "../../typescript/type/instructor.type";
import type { InstructorListInterface } from "../../typescript/interface/instructor.interface";

const initialState: instructorInitialState = {
  error: null,
  InstructorLoading: false,
  instructorList: [],
  totals: 0,
  page: 1,
};

export const getAllInstructor = createAsyncThunk<
  { instructors: InstructorListInterface[]; total: number },
  { page?: number; limit?: number; all?: boolean },
  { rejectValue: ErrorResponse }
>("mycourse/get", async ({ page, limit, all }, { rejectWithValue }) => {
  try {
    const queries = [];
    if (all) {
      queries.push(Query.limit(100));
    } else {
      queries.push(Query.limit(limit || 5));
      queries.push(Query.offset(((page || 1) - 1) * (limit || 5)));
    }

    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "instructor-request",
      queries: queries,
    });

    const mappedInstructor = response.rows.map((row) => ({
      $id: row.$id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      bio: row.bio,
      experience: row.experience,
      skills: row.skills,
      status: row.status,
      userId: row.userId,
      image: row.image,
    }));
    return {
      instructors: mappedInstructor,
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const createInstructor = createAsyncThunk<
  InstructorListInterface,
  { data: InstructorFormData },
  { rejectValue: ErrorResponse }
>("instructor/create", async ({ data: data }, { rejectWithValue }) => {
  const allUser = await account.get();
  console.log("user list", allUser);
  try {
    let imageurl;
    if (data.image) {
      const file = await storage.createFile({
        bucketId: import.meta.env.VITE_APPWRITE_PROJECT_BUCKET_ID,
        fileId: ID.unique(),
        file: data.image,
        permissions: [Permission.read(Role.any())],
      });

      imageurl = storage.getFileView({
        bucketId: import.meta.env.VITE_APPWRITE_PROJECT_BUCKET_ID,
        fileId: file.$id,
      });
    }
    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "instructor-request",
      rowId: ID.unique(),
      data: {
        userId: allUser.$id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        experience: data.experience,
        status: "pending",
        skills: data.skills,
        image: imageurl,
      },
      permissions: [
        Permission.read(Role.user(allUser.$id)),
        Permission.read(Role.any()),
      ],
    });

    const instructorResponse = {
      $id: response.$id,
      userId: response.userId,
      name: response.name,
      phone: response.phone,
      email: response.email,
      bio: response.bio,
      experience: response.experience,
      status: response.status,
      skills: response.skills,
      image: response.image,
    };

    return instructorResponse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const deleteInstructor = createAsyncThunk<
  { id: string },
  { id: string; userId: string },
  { rejectValue: ErrorResponse }
>("course/delete", async ({ id: id, userId: userId }, { rejectWithValue }) => {
  // console.log("id from deletecourse", id);
  try {
    const response = await tablesDB.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "instructor-request",
      rowId: id,
    });

    if (response) {
      const res = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
        queries: [Query.equal("userId", userId)],
      });

      const userRow = res.rows[0];

      if (!userRow) {
        throw new Error("User not found in register table");
      }
      await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
        rowId: userRow.$id,
        data: {
          role: "student",
        },
      });
    }

    return { id };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const updateInstructorStatus = createAsyncThunk<
  { $id: string; status: string },
  { id: string; status: string | undefined; userId: string },
  { rejectValue: ErrorResponse }
>("cource/status", async ({ id, status, userId }, { rejectWithValue }) => {
  console.log("userId", userId);
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "instructor-request",
      rowId: id,
      data: {
        ...(status && { status }),
      },
    });

    if (response.status === "approved") {
      const res = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
        queries: [Query.equal("userId", userId)],
      });

      const userRow = res.rows[0];

      if (!userRow) {
        throw new Error("User not found in register table");
      }
      await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
        rowId: userRow.$id,
        data: {
          role: "instructor",
        },
      });
    }

    const updateStatusResponse = {
      $id: response.$id,
      status: response.status,
    };
    return updateStatusResponse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    handlePrev: (state) => {
      state.page = state.page - 1;
    },
    handleNext: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructor.pending, (state) => {
        state.InstructorLoading = true;
        state.error = null;
      })
      .addCase(getAllInstructor.fulfilled, (state, action) => {
        state.InstructorLoading = false;
        // console.log(action.payload);
        state.instructorList = action.payload.instructors;
        state.totals = action.payload.total;
      })
      .addCase(getAllInstructor.rejected, (state, action) => {
        state.InstructorLoading = false;
        // console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(createInstructor.pending, (state) => {
        state.InstructorLoading = true;
        state.error = null;
      })
      .addCase(createInstructor.fulfilled, (state) => {
        state.InstructorLoading = false;
        // console.log("create all instructor",action.payload)
      })
      .addCase(createInstructor.rejected, (state, action) => {
        state.InstructorLoading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updateInstructorStatus.fulfilled, (state, action) => {
        state.InstructorLoading = false;
        // console.log("action from updateinstructor", action.payload);
        const findObj = state.instructorList?.find(
          (instructor) => instructor.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.status = action.payload.status;
        }
      })
      .addCase(updateInstructorStatus.rejected, (state, action) => {
        state.InstructorLoading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.InstructorLoading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      });
  },
});

export const { handlePrev, handleNext } = instructorSlice.actions;
export default instructorSlice.reducer;
