import { configureStore } from "@reduxjs/toolkit";
import currentRepoSlice from "./currentRepoSlice";
import issuesSlice, { changeLimit, changeIssueStatus } from "./issuesSlice";
import { fetchRepoData } from "./thunks";

const store = configureStore({
  reducer: {
    currentRepo: currentRepoSlice.reducer,
    issues: issuesSlice.reducer,
  },
});

export { fetchRepoData, changeLimit, changeIssueStatus };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
