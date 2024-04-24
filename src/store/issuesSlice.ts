import { createSlice } from "@reduxjs/toolkit";
import { fetchIssuesDataByStatus } from "./thunks";

interface IssuesByStatus {
  toDo: Array<any>;
  inProgress: Array<any>;
  done: Array<any>;
}

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    status: { toDo: "initial", inProgress: "initial", done: "initial" },
    limit: 30,
    allIssuesByRepo: {} as Record<string, IssuesByStatus>,
  },
  reducers: {
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      const columnName = action.payload.columnName;
      state.status[columnName] = action.payload.status;
    },
    changeIssueStatus: (state, action) => {
      const { repoName, source, destination } = action.payload;
      const { droppableId: oldColumn, index: oldIndex } = source;
      const { droppableId: newColumn, index: newIndex } = destination;

      const [deletedElement] = state.allIssuesByRepo[repoName][
        oldColumn
      ].splice(oldIndex, 1);
      state.allIssuesByRepo[repoName][newColumn].splice(
        newIndex,
        0,
        deletedElement
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssuesDataByStatus.fulfilled, (state, action) => {
      if (!action.payload) return;

      const { name: repoName, issues, columnName } = action.payload;

      if (!issues) return;

      state.allIssuesByRepo[repoName] = state.allIssuesByRepo[repoName] || {
        toDo: [],
        inProgress: [],
        done: [],
      };
      state.allIssuesByRepo[repoName][columnName] = issues;

      state.status[columnName] = "fulfilled";
    });
  },
});

export const { changeLimit, changeLoadingStatus, changeIssueStatus } =
  issuesSlice.actions;
export default issuesSlice;
