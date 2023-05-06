// This store of redux is used to maintain and manage the state without using props and sending the data from parent to child and vice versa.

import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    // Name of the reducer used(anything of our choice) and the action that needs to be performed when this reducer is called.
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
  },
});
