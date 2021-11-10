import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    isFetching: false,
    error: false,
    errorMessage: "",
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, changeCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
