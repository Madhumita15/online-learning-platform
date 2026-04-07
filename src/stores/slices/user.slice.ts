import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tablesDB } from "../../lib/appwrite.config";
import { Query } from "appwrite";
import type { ErrorResponse } from "../../typescript/type/auth.type";
import type { UserInitialState, UserResponseType } from "../../typescript/type/user.type";



const initialState: UserInitialState = {
  loading: false,
  error: null,
  userList: [],
};

export const getAllUsers = createAsyncThunk<
UserResponseType[],
void,
{rejectValue: ErrorResponse}

>(
  "adminUser/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
      });

      const userResponse = res.rows.map((user)=>({
         $id: user.$id,
         name: user.name,
         email: user.email,
         role: user.role,
         userId: user.userId
      }
       
      ))

      return userResponse;
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed",
      });
    }
  },
);

export const chnageRoleSlice = createAsyncThunk<
{$id: string, role: string},
{role: string, userId: string, change: string },
{rejectValue: ErrorResponse}
>(
  "adminuser/changerole",
  async ({role, userId, change }) => {
    if (role === "student") {
      const res = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
        tableId: "register",
        queries: [Query.equal("userId", [userId])],
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
          role: change,
        },
      });

      return ({$id: res.rows[0].$id, role: change})
    } else {
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
          role: change,
        },
      });
      return ({$id: res.rows[0].$id, role: change})
    }

    
    
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.userList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        console.log("action inside rejected", action);
        state.error =
          (action?.payload?.message as string) || "Soemthing went wrong";
      })
      .addCase(chnageRoleSlice.fulfilled, (state, action) => {
        state.loading = false;
        const findObj = state.userList?.find(
          (obj) => obj.$id === action.payload.$id,
        );
        if (findObj) {
          findObj.role = action.payload.role;
        }
      })
      .addCase(chnageRoleSlice.rejected, (state, action) => {
        state.loading = false;
        // console.log("action inside rejected", action.payload.message);
        state.error =
          (action?.payload?.message as string) || "something went wrong";
      });
  },
});

export default userSlice.reducer;
