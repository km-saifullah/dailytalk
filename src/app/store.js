import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import activeUserSlice from "../features/activeUser/activeUserSlice";

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice,
    activeuserdata: activeUserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
