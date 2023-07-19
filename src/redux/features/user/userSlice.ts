/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { createAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const logout = createAction("auth/logout");
interface IUserState {
  user: {
    name: string | null;
    email: string | null;
  };
  userEmail: string | null;
  isLoading: boolean | null;
  isLoggedIn: boolean;
  isError: boolean;
  error: string | null;
}
interface ICredential {
  name: string;
  email: string;
  password: string;
}
interface ILogInCredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    name: null,

    email: null,
  },
  userEmail: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  error: null,
};
export const createUser = createAsyncThunk(
  "users/create-user",
  async ({ email, password, name }: ICredential) => {
    try {
      const response = await axios.post(
        "https://bookbackend-77zi8soyy-r4fi.vercel.app/api/v1/users/create-user",
        { email, password, name }
      );
      const successMessage = response.data.message;
      toast.success(successMessage);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILogInCredential) => {
    try {
      const response = await axios.post(
        "https://bookbackend-77zi8soyy-r4fi.vercel.app/api/v1/auth/login",
        { email, password }
      );
      const accessToken = response.data.data.accessToken;
      const userEmail = response?.data?.data.email;

      localStorage.setItem("userEmail", userEmail);
      Cookies.set("accessToken", accessToken);
      Cookies.set("userEmail", userEmail);
      // Save the access token to local storage
      localStorage.setItem("accessToken", accessToken as string);
      const successMessage = response.data.message;
      toast.success(successMessage);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
);
//

export const getToken = () => {
  return localStorage.getItem("accessToken");
};
export const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userEmail");
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (state, _action: PayloadAction<string | null>) => {
      state.user.email;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(logout, (state) => {
        // Reset user state to initial values
        state.user.email = null;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      });
  },
});
export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
