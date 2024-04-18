import { configureStore } from "@reduxjs/toolkit";
import currentRepoSlice from "./currentRepoSlice";
import issuesSlice, { changeLimit } from "./issuesSlice";
import { fetchRepoData } from "./thunks";

const store = configureStore({
  reducer: {
    currentRepo: currentRepoSlice.reducer,
    issues: issuesSlice.reducer,
  },
});

export { fetchRepoData, changeLimit };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
