import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account, storage, tablesDB } from "../../lib/appwrite.config";
import { ID, Permission, Query, Role } from "appwrite";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type {
  BlogInitialstate,
  CreateBlogResponseInterface,
  GetallBlogResponseInterface,
  UpdateBlogResponseInterface,
} from "../../typescript/interface/blog.interface";
import type { CreateBlogInputResponse } from "../../typescript/type/blog.type";

const initialState: BlogInitialstate = {
  loading: false,
  error: null,
  blogList: [],
  page: 1,
  totals: 0,
  isBlogId: null,
};

export const getAllBlog = createAsyncThunk<
  { blog: GetallBlogResponseInterface[]; total: number },
  { page?: number | undefined; limit?: number | undefined; all?: boolean },
  { rejectValue: ErrorResponse }
>("blog/get", async ({ page, limit, all }, { rejectWithValue }) => {
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
      tableId: "blogs",
      queries,
    });
    console.log("get blog ", response);
    const mappedBlog = response.rows.map((row) => ({
      $id: row.$id,
      title: row.title,
      content: row.content,
      image: row.image,
      status: row.status,
    }));
    return {
      blog: mappedBlog,
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const getMyBlog = createAsyncThunk<
  { blog: GetallBlogResponseInterface[]; total: number },
  { page?: number | undefined; limit?: number | undefined; all?: boolean },
  { rejectValue: ErrorResponse }
>("blog/myblog", async ({ page, limit, all }, { rejectWithValue }) => {
  const user = await account.get();
  try {
    const queries = [Query.equal("authorId", user.$id)];
    if (all) {
      queries.push(Query.limit(100));
    } else {
      queries.push(Query.limit(limit || 5));
      queries.push(Query.offset(((page || 0) - 1) * (limit || 5)));
    }
    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "blogs",
      queries,
    });
    console.log("get blog ", response);
    const mappedMyBlog = response.rows.map((row) => ({
      $id: row.$id,
      title: row.title,
      content: row.content,
      image: row.image,
      status: row.status,
    }));
    return {
      blog: mappedMyBlog,
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const createBlog = createAsyncThunk<
  CreateBlogResponseInterface,
  { data: CreateBlogInputResponse; role: string | null },
  { rejectValue: ErrorResponse }
>("blog/add", async ({ data, role }, { rejectWithValue }) => {
  try {
    const user = await account.get();
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
      tableId: "blogs",
      rowId: ID.unique(),
      data: {
        title: data.title,
        content: data.content,
        image: imageurl,
        authorId: user.$id,
        authorName: user.name,
        status: role === "admin" ? "approved" : "pending",
      },
      permissions: [
        Permission.read(Role.any()),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });

    const mappedCreateBlog = {
      $id: response.$id,
      title: response.title,
      content: response.content,
      image: response.image,
      authorName: response.authorName,
      authorId: response.authorId,
      status: response.status,
    };
    console.log(response);
    return mappedCreateBlog;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const updateBlog = createAsyncThunk<
  UpdateBlogResponseInterface,
  { id: string; data: { title: string; content: string } },
  { rejectValue: ErrorResponse }
>("blog/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "blogs",
      rowId: id,
      data: {
        title: data.title,
        content: data.content,
      },
    });

    const updateResponse = {
      $id: response.$id,
      title: response.title,
      content: response.content,
      authorId: response.authorId,
      authorName: response.authorName,
      status: response.status,
    };

    console.log("update response from thunk", response);
    return updateResponse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const deleteBlog = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: ErrorResponse }
>("course/delete", async ({ id }, { rejectWithValue }) => {
  // console.log("id from deletecourse", id);
  try {
    await tablesDB.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "blogs",
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
  { $id: string; status: string },
  { id: string; status: string },
  { rejectValue: ErrorResponse }
>("blog/status", async ({ id, status }, { rejectWithValue }) => {
  console.log("is inside thunk", id);
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "blogs",
      rowId: id,
      data: {
        status: status,
      },
    });
    const mappedStatusResponse = {
      $id: response.$id,
      status: response.status,
    };
    console.log("update response from thunk", response);
    console.log(mappedStatusResponse);
    return mappedStatusResponse;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

const blogSlice = createSlice({
  name: "blog/slice",
  initialState,
  reducers: {
    handlePrev: (state) => {
      state.page = state.page - 1;
    },
    handleNext: (state) => {
      state.page = state.page + 1;
    },
    setIsBlogId: (state, action) => {
      state.isBlogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.blogList = action.payload.blog;
        state.totals = action.payload.total;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(getMyBlog.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.blogList = action.payload.blog;
        state.totals = action.payload.total;
      })
      .addCase(getMyBlog.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.loading = false;
        // console.log(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const findObj = state.blogList.find(
          (blog) => blog.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.title = action.payload.title;
          findObj.content = action.payload.content;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const findObj = state.blogList.find(
          (blog) => blog.$id === action.payload.$id,
        );
        console.log(action.payload.$id);
        if (findObj) {
          findObj.status = action.payload.status;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      });
  },
});

export const { handlePrev, handleNext, setIsBlogId } = blogSlice.actions;
export default blogSlice.reducer;
