import { createSlice } from "@reduxjs/toolkit";
import { fetchIssuesData } from "./thunks";

export const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    allIssuesByRepo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssuesData.fulfilled, (state, action) => {
      const { name: repoName, issues } = action.payload;

      if (!issues) return;

      state.allIssuesByRepo[repoName] = issues;
    });
  },
});
