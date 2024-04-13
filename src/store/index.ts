import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchData } from "../utils/fetchData";

interface FetchIssuesArgs {
  owner: string;
  repo: string;
}

interface FetchedIssues {
  name: string;
  data: Array<any>;
}

export const fetchIssues = createAsyncThunk<FetchedIssues, FetchIssuesArgs>(
  "issues/fetchIssues",
  async ({ owner, repo }) => {
    const response = await fetchData(owner, repo);
    return { name: `${owner}/${repo}`, data: response };
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      const { name, data } = action.payload;
      state[name] = data;
    });
  },
});

const store = configureStore({
  reducer: issuesSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
