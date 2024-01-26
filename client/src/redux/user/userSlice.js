import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
    //   state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state)=>{
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) =>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state,action) =>{
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSucess,
  updateStart,
  updateSuccess,
  updateFailure,
  signInFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteFailure
} = userSlice.actions;

export default userSlice.reducer;
