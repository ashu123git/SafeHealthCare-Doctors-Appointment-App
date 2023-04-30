// This contains the reducers which maintain the state and manipulate it so that it can be used anywhere with the help of useDispatch hook.

import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  // Name of reducer
  name: "alerts",
  // It's initial state
  initialState: {
    loading: false,
  },
  // Actions that will change the state
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertSlice.actions;
