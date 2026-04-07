import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ID, tablesDB } from "../../lib/appwrite.config";
import { Permission, Query, Role } from "appwrite";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { AllCategoryResponseType } from "../../typescript/type/category.type";
import type { CategoryInitialStateInterface } from "../../typescript/interface/category.interface";

const initialState: CategoryInitialStateInterface = {
  loading: false,
  error: null,
  allCatagories: [],
  page: 1,
  totals: 0,
  isEditCategoryId: null,
};


//with pagination
export const getAllCategory = createAsyncThunk<
  { categories: AllCategoryResponseType[]; total: number },
  { page?: number; limit?: number; all?: boolean },
  { rejectValue: ErrorResponse }
>("category/get", async ({ page, limit, all }, { rejectWithValue }) => {
  try {
    const queries = []
    if(all){
      queries.push(Query.limit(100))

    }else{
      queries.push(Query.limit(limit || 5))
      queries.push(Query.offset(((page || 1) - 1) * (limit || 5)))

    }
    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "category",
      queries
    });
    console.log("all category response");

    return {
      categories: response.rows as unknown as AllCategoryResponseType[],
      total: response.total,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});




export const createCategory = createAsyncThunk<
  AllCategoryResponseType,
  { data: { name: string }; role: string | null },
  { rejectValue: ErrorResponse }
>("category/add", async ({ data, role }, { rejectWithValue }) => {
  try {
    if (role !== "admin") {
      return rejectWithValue({
        success: false,
        message: "only admin can create course",
      });
    }
    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "category",
      rowId: ID.unique(),
      data: {
        name: data.name,
      },
      permissions: [
        Permission.read(Role.any()),
        Permission.delete(Role.label("admin")),
        Permission.update(Role.label("admin")),
      ],
    });
    console.log(response);
    return response as unknown as AllCategoryResponseType;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Rejected",
    });
  }
});

export const updateCategory = createAsyncThunk<
  AllCategoryResponseType,
  { id: string; data: AllCategoryResponseType },
  { rejectValue: ErrorResponse }
>("category/update", async ({ id, data }, { rejectWithValue }) => {
  console.log("formdata", data);
  console.log("update id", id);
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "category",
      rowId: id,
      data: {
        name: data.name,
      },
    });

    console.log("update response from thunk", response);
    return response as unknown as AllCategoryResponseType;
  } catch {
    return rejectWithValue({
      success: false,
      message: "Failed",
    });
  }
});

export const deleteCategory = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: ErrorResponse }
>("category/delete", async ({ id }, { rejectWithValue }) => {
  console.log("id from deletecourse", id);
  try {
    await tablesDB.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "category",
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

const categorySlice = createSlice({
  name: "category/slice",
  initialState,
  reducers: {
    handlePrev: (state) => {
      state.page = state.page - 1;
    },
    handleNext: (state) => {
      state.page = state.page + 1;
    },
    setError: (state) => {
      state.error = null;
    },
    setIsCategoryId: (state, action) => {
      state.isEditCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("all category", action.payload);
        state.allCatagories = action.payload.categories;
        state.totals = action.payload.total;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("create category", action.payload);
        state.allCatagories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("update category", action.payload);
        const findObj = state.allCatagories.find(
          (course) => course.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.name = action.payload.name;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      });
  },
});

export const { handleNext, handlePrev, setError, setIsCategoryId } =
  categorySlice.actions;
export default categorySlice.reducer;
