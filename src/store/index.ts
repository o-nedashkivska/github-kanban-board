import { configureStore } from "@reduxjs/toolkit";
import currentRepoSlice from "./currentRepoSlice";
import issuesSlice, { changeLimit, changeIssueStatus } from "./issuesSlice";
import listenerMiddleware from "./middlewares";
import { fetchRepoData } from "./thunks";

export const reducer = {
  currentRepo: currentRepoSlice.reducer,
  issues: issuesSlice.reducer,
};

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().prepend(listenerMiddleware.middleware);

const store = configureStore({
  reducer,
  middleware,
});

export { fetchRepoData, changeLimit, changeIssueStatus };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
