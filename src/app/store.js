import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
