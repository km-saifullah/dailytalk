import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const activeUserSlice = createSlice({
  name: "activeuser",
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { activeUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;
