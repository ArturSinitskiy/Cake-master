import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "@models/AuthSlice.ts";

interface LoginProps {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  modalOpen: boolean;
  username: string;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("username") !== null,
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
  error: null,
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async ({ username, password }: LoginProps, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: username, password }),
      });

      if (response.status === 200) {
        const user = await response.json();
        localStorage.setItem("username", user.login);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Произошла ошибка при входе. Попробуйте еще раз.");
    }
  }
);

export const doLogout = createAsyncThunk("auth/doLogout", async () => {
  // Добавьте логику выхода, если необходимо
  localStorage.removeItem("username");
  localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.username = action.payload.login;
        state.isLoggedIn = true;
        state.modalOpen = false;
        state.error = null;
      })
      .addCase(doLogin.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(doLogout.fulfilled, (state) => {
        state.username = "";
        state.isLoggedIn = false;
      });
  },
});

export const { updateModal } = authSlice.actions;
export default authSlice.reducer;
