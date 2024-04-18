import { createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./thunks";

const initialStatusReason =
  "To view issues of any existing repository, please enter a valid repository url into the input above and click 'Load issues' button.";

export const currentRepoSlice = createSlice({
  name: "currentRepo",
  initialState: {
    status: "initial",
    statusReason: initialStatusReason,
    name: "",
    stars: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepoData.pending, (state) => {
      state.status = "loading";
      state.statusReason = "Please wait, the data is loading.";
    });
    builder.addCase(fetchRepoData.rejected, (state, action) => {
      state.status = "rejected";
      state.statusReason = action.error.message;
      state.name = "";
      state.stars = 0;
    });
    builder.addCase(fetchRepoData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.statusReason = "";

      const { name, stars } = action.payload;

      if (!name || !stars) return;

      state.name = name;
      state.stars = stars;
    });
  },
});
