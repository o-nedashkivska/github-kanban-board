import { createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./thunks";

export const currentRepoSlice = createSlice({
  name: "currentRepo",
  initialState: {
    name: undefined,
    stars: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepoData.fulfilled, (state, action) => {
      const { name, stars } = action.payload;

      if (!name || !stars) return;

      state.name = name;
      state.stars = stars;
    });
  },
});
