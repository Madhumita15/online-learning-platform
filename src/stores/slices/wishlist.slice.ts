import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ID, tablesDB } from "../../lib/appwrite.config";
import { Permission, Role } from "appwrite";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { wishListInterface } from "../../typescript/interface/wishlist.interface";
import type { getWishlistType } from "../../typescript/type/wishlist.type";


const initialState: wishListInterface = {
  allWishList: [],
  isWishlistedMap: {},
};

export const getWishlist = createAsyncThunk<
{rows: getWishlistType[]},
void,
{rejectValue: ErrorResponse}
>(
  "wish/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "wishlist",
      });
      return {
        rows: response.rows.map((item)=>({
          $id: item.$id,
          userId: item.userId,
          courseId: item.courseId

      }))
      };
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed to get wishlist",
      });
    }
  },
);

export const createWishList = createAsyncThunk<
getWishlistType,
{userId: string, courseId: string},
{rejectValue: ErrorResponse}
>(
  "wish/create",
  async ({ userId, courseId,}, { rejectWithValue }) => {
    try {
      const response = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "wishlist",
        rowId: ID.unique(),
        data: {
          userId: userId,
          courseId: courseId,
        },
        permissions: [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
      });

      return {
        $id: response.$id,
        userId: response.userId,
        courseId: response.courseId,
      };
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed To Create Wishlist",
      });
    }
  },
);

export const deleteWishlist = createAsyncThunk<
{id: string},
{id: string},
{rejectValue: ErrorResponse}
>(
  "wish/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
       await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "wishlist",
        rowId: id,
      });

      return {id}
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed to delete",
      });
    }
  },
);

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWishList.fulfilled, (state, action) => {
        state.allWishList.push(action.payload);
        state.isWishlistedMap[action.payload.courseId] = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        const deleteItem = state.allWishList.find(
          (item) => item.$id === action.payload.id,
        );
        if (deleteItem) {
          state.isWishlistedMap[deleteItem.courseId] = false;
        }
        state.allWishList = state.allWishList.filter(
          (wishlist) => wishlist.$id !== action.payload.id,
        );
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        // console.log("get all wishlist",action.payload)
        const map: Record<string, boolean> = {};

        action.payload.rows.forEach((item) => {
          map[item.courseId] = true;
        });
        state.isWishlistedMap = map;
        state.allWishList = action.payload.rows;
      });
  },
});

export default wishSlice.reducer;
