import { configureStore } from "@reduxjs/toolkit";
import { currentRepoSlice } from "./currentRepoSlice";
import { issuesSlice } from "./issuesSlice";
import { fetchRepoData } from "./thunks";

const store = configureStore({
  reducer: {
    currentRepo: currentRepoSlice.reducer,
    issues: issuesSlice.reducer,
  },
});

export { fetchRepoData };
export type AppDispatch = typeof store.dispatch;
export default store;
