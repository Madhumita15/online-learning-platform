import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account, ID, storage, tablesDB } from "../../lib/appwrite.config";
import { Permission, Query, Role } from "appwrite";
import type {
  CourseInitialState,
  CreateFieldData,
  UpdateStatusResponse,
} from "../../typescript/interface/course.interface";
import type {
  CourseListResponseType,
  CreateCourseResponse,
  deleteCourseResponse,
  getSingleCourseType,
  updateCourseInput,
  updateCourseResponseType,
} from "../../typescript/type/course.type";
import type { ErrorResponse } from "../../typescript/type/auth.type";

const initialState: CourseInitialState = {
  loading: false,
  error: null,
  courselist: [],
  page: 1,
  totals: 0,
  isEdit: null,
  open: false,
  singleIdCourse: null,
  myCourse: []
};

export const getAllCourse = createAsyncThunk<
  CourseListResponseType,
  { page?: number; limit?: number; all?: boolean },
  { rejectValue: ErrorResponse }
>("course/get", async ({ page, limit, all }, { rejectWithValue }) => {
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
      tableId: "courses",
      queries,
    });

    const mappedCourses = response.rows.map((row) => ({
      $id: row.$id,
      title: row.title,
      description: row.description,
      categoryId: row.categoryId,
      instructorId: row.instructorId,
      instructorName: row.instructorName,
      price: Number(row.price),
      image: row.image,
      rating: Number(row.rating),
      status: row.status,
      language: row.language,
      duration: Number(row.duration),
      categoryName: row.categoryName,
      approveStatus: row.approveStatus,
    }));
    return {
      courses: mappedCourses,
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const getMyCourse = createAsyncThunk<
  CourseListResponseType,
  { page?: number | undefined; limit?: number | undefined; all?: boolean },
  { rejectValue: ErrorResponse }
>("mycourse/get", async ({ page, limit, all }, { rejectWithValue }) => {
  try {
    const user = await account.get();
    const queries = [Query.equal("instructorId", user.$id)];
    if (all) {
      queries.push(Query.limit(100));
    } else {
      queries.push(Query.limit(limit || 5));
      queries.push(Query.offset(((page || 0) - 1) * (limit || 5)));
    }

    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "courses",
      queries: queries,
    });

    const mappedMyCourses = response.rows.map((row) => ({
      $id: row.$id,
      title: row.title,
      description: row.description,
      categoryId: row.categoryId,
      instructorId: row.instructorId,
      instructorName: row.instructorName,
      price: Number(row.price),
      image: row.image,
      rating: Number(row.rating),
      status: row.status,
      language: row.language,
      duration: Number(row.duration),
      categoryName: row.categoryName,
      approveStatus: row.approveStatus,
    }));
    return {
      courses: mappedMyCourses,
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const getSingleCourse = createAsyncThunk<
  getSingleCourseType,
  { rowId: string },
  { rejectValue: ErrorResponse }
>("course/getSingle", async ({ rowId }, { rejectWithValue }) => {
  try {
    const response = await tablesDB.getRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "courses",
      rowId: rowId,
    });

    return {
      $id: response.$id,
      title: response.title,
      description: response.description,
      categoryId: response.categoryId,
      instructorId: response.instructorId,
      instructorName: response.instructorName,
      price: Number(response.price),
      image: response.image,
      rating: Number(response.rating),
      status: response.status,
      language: response.language,
      duration: Number(response.duration),
      categoryName: response.categoryName,
      approveStatus: response.approveStatus,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed to fetch course",
    });
  }
});

export const getCoursesByIds = createAsyncThunk<
CourseListResponseType,
{courseIds: string[]},
{rejectValue: ErrorResponse}

>(
  "courses/getByIds",
  async ({courseIds}, { rejectWithValue }) => {
    try {
      const response = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "courses",
        queries: [Query.equal("$id", courseIds)],
      });

       const mappedCourses = response.rows.map((row) => ({
      $id: row.$id,
      title: row.title,
      description: row.description,
      categoryId: row.categoryId,
      instructorId: row.instructorId,
      instructorName: row.instructorName,
      price: Number(row.price),
      image: row.image,
      rating: Number(row.rating),
      status: row.status,
      language: row.language,
      duration: Number(row.duration),
      categoryName: row.categoryName,
      approveStatus: row.approveStatus,
    }));
    return {
      courses: mappedCourses,
      total: response.total,
    };
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed to fetch courses",
      });
    }
  },
);

export const createCourse = createAsyncThunk<
  CreateCourseResponse,
  {
    data: CreateFieldData;
    role: string | null;
  },
  { rejectValue: ErrorResponse }
>("course/add", async ({ data, role }, { rejectWithValue }) => {
  try {
    const user = await account.get();
    console.log("account user", user);

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
      tableId: "courses",
      rowId: ID.unique(),
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        image: imageurl,
        categoryName: data.categoryName,
        instructorId: user.$id,
        instructorName: user.name,
        status: "unpublished",
        rating: 0,
        approveStatus: role === "admin" ? "approved" : "pending",
      },
      permissions: [
        Permission.read(Role.any()),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });

    const mappedCreateCourse = {
      $id: response.$id,
      title: response.title,
      description: response.description,
      price: Number(response.price),
      categoryId: response.categoryId,
      instructorId: response.instructorId,
      categoryName: response.categoryName,
      instructorName: response.instructorName,
      image: response.image,
      status: response.status,
      rating: Number(response.rating),
      approveStatus: response.approveStatus,
    };
    // console.log(response);
    return mappedCreateCourse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const updatecourse = createAsyncThunk<
  updateCourseResponseType,
  { id: string; data: updateCourseInput },
  { rejectValue: ErrorResponse }
>("course/update", async ({ id, data }, { rejectWithValue }) => {
  // console.log("formdata", data);
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "courses",
      rowId: id,
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        price: data.price,
        status: data.status,
        approveStatus: data.approveStatus,
      },
    });

    const updateResponse = {
      $id: response.$id,
      title: response.title,
      description: response.description,
      price: response.price,
      categoryId: response.categoryId,
      categoryName: response.categoryName,
      status: response.status,
      approveStatus: response.approveStatus,
    };

    console.log("update response from thunk", response);
    return updateResponse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const deleteCourse = createAsyncThunk<
  deleteCourseResponse,
  { id: string },
  { rejectValue: ErrorResponse }
>("course/delete", async ({ id }, { rejectWithValue }) => {
  // console.log("id from deletecourse", id);
  try {
    await tablesDB.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "courses",
      rowId: id,
    });
    return { id };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const updateStatus = createAsyncThunk<
  UpdateStatusResponse,
  {
    id: string;
    status: string | undefined;
    approveStatus?: string | undefined;
  },
  { rejectValue: ErrorResponse }
>(
  "cource/status",
  async ({ id, status, approveStatus }, { rejectWithValue }) => {
    try {
      const response = await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "courses",
        rowId: id,
        data: {
          ...(status && { status }),
          ...(approveStatus && { approveStatus }),
        },
      });
      const updateStatusResponse = {
        $id: response.$id,
        status: response.status,
        approveStatus: response.approveStatus,
      };
      return updateStatusResponse;
    } catch {
      return rejectWithValue({
        success: false,
        message: "Rejected",
      });
    }
  },
);

const courseSlice = createSlice({
  name: "course/slice",
  initialState,
  reducers: {
    handlePrev: (state) => {
      state.page = state.page - 1;
    },
    handleNext: (state) => {
      state.page = state.page + 1;
    },

    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setError: (state) => {
      state.error = null;
    },
    setOpen: (state) => {
      state.open = true;
    },
    setClose: (state) => {
      state.open = false;
    },
    resetMyCourse: (state)=> {
      state.myCourse = []
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.courselist = action.payload.courses;
        state.totals = action.payload.total;
      })
      .addCase(getAllCourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(getMyCourse.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.courselist = action.payload.courses;
        state.totals = action.payload.total;
      })
      .addCase(getMyCourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(getSingleCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action from singlecourse");
        state.singleIdCourse = action.payload;
      })
      .addCase(getSingleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.loading = false;
        // console.log(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updatecourse.fulfilled, (state, action) => {
        state.loading = false;
        const findObj = state.courselist.find(
          (course) => course.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.categoryId = action.payload.categoryId;
          findObj.description = action.payload.description;
          findObj.price = action.payload.price;
          findObj.title = action.payload.title;
          findObj.categoryName = action.payload.categoryName;
        }
      })
      .addCase(updatecourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const findObj = state.courselist?.find(
          (course) => course.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.status = action.payload.status;
          findObj.approveStatus = action.payload.approveStatus;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(getCoursesByIds.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursesByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myCourse = action.payload.courses;
      })
      .addCase(getCoursesByIds.rejected, (state, action)=>{
        state.loading = false;
        state.error =
          (action?.payload?.message as string) || "something went wrong";

      })
  },
});

export const {
  handleNext,
  handlePrev,
  setIsEdit,
  setError,
  setOpen,
  setClose,
  resetMyCourse
} = courseSlice.actions;
export default courseSlice.reducer;
