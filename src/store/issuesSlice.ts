import { createSlice } from "@reduxjs/toolkit";
import { fetchIssuesDataByStatus } from "./thunks";

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    status: { toDo: "initial", inProgress: "initial", done: "initial" },
    limit: 30,
    allIssuesByRepo: {},
  },
  reducers: {
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
    changeStatus: (state, action) => {
      const columnName = action.payload.columnName;
      state.status[columnName] = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssuesDataByStatus.fulfilled, (state, action) => {
      if (!action.payload) return;

      const { name: repoName, issues, columnName } = action.payload;

      if (!issues) return;

      state.allIssuesByRepo[repoName] = state.allIssuesByRepo[repoName] || {};
      state.allIssuesByRepo[repoName][columnName] = issues;

      state.status[columnName] = "fulfilled";
    });
  },
});

export const { changeLimit, changeStatus } = issuesSlice.actions;
export default issuesSlice;
