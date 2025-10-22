import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js"
import leadReducer from "./slices/leadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    leads: leadReducer,
  },
});

export default store;
