import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account, ID, tablesDB } from "../../lib/appwrite.config";
import { Query } from "appwrite";
import Cookies from "js-cookie";
import type {
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
} from "../../typescript/type/auth.type";
import type { AuthState } from "../../typescript/interface/auth.interface";
import { toast } from "sonner";
const token = Cookies.get("token") ?? null;
const role = Cookies.get("role") ?? null;
const user = Cookies.get("user")
  ? JSON.parse(Cookies.get("user") as string)
  : { userId: null, role: null, name: null, email: null };

const initialState: AuthState = {
  loading: false,
  registerError: null,
  loginError: null,
  token: token,
  user: user,
  role: role,
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: ErrorResponse }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await account.create({
      userId: ID.unique(),
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "register",
      rowId: ID.unique(),
      data: {
        userId: response.$id,
        name: data.name,
        email: data.email,
        role: "student",
      },
    });
    console.log("response from registeruser", response);
    return {
      success: true,
      message: "User Registered Successfully!",
      data: {
        userId: response.$id,
        name: data.name,
        email: data.email,
        role: "student",
      },
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "User Already exist!",
    });
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: ErrorResponse }
>("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const existingUser = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
      tableId: "register",
      queries: [Query.equal("email", [data.email])],
    });
    // console.log("existing user", existingUser);

    if (existingUser.total === 0) {
      toast.success("user not found in db");
      return rejectWithValue({
        success: false,
        message: "User not found!",
      });
    }

    await account.createEmailPasswordSession({
      email: data.email,
      password: data.password,
    });

    const row = existingUser.rows[0];
    const user = {
      userId: row.userId,
      name: row.name,
      email: row.email,
      role: row.role,
    };

    return {
      success: true,
      message: "Login Successfull",
      user,
    };
  } catch {
    return rejectWithValue({
      success: false,
      message: "Invalid credentials",
    });
  }
});

export const logoutUser = createAsyncThunk<
{success: boolean},
void,
{rejectValue: ErrorResponse}
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("logout inside logoutuser thunk");
      await account.deleteSession("current");
      return {
        success: true
      };
    } catch {
      return rejectWithValue({
        success: false,
        message: "Failed to Logout",
      });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // console.log(
        //   "error coming from register user",
        //   action?.payload?.message as string,
        // );
        state.registerError = action?.payload?.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("login user details", action.payload);
        state.user = action.payload?.user;
        state.token = "true";
        state.role = action.payload?.user.role;
        Cookies.set("token", "true");
        Cookies.set("role", action.payload.user.role);
        Cookies.set("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // console.log("error coming from login user", action?.payload);
        state.loginError = action?.payload?.message as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // console.log("logout action response", action.payload);
        state.token = null;
        state.role = null;
        state.user = { userId: null, role: null, name: null, email: null };
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("user");
      })
      .addCase(logoutUser.rejected, () => {
        toast.success("Logout Failed");
      });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
