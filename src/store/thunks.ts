import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRepo, fetchIssues } from "../utils/fetchData";

interface FetchDataArgs {
  owner: string;
  repo: string;
}

interface FetchedRepoData {
  name: string;
  stars: number;
}

interface FetchedIssuesData {
  name: string;
  issues: Array<any>;
}

export const fetchIssuesData = createAsyncThunk<
  FetchedIssuesData,
  FetchDataArgs
>("issues/fetchIssues", async ({ owner, repo }) => {
  const issues = await fetchIssues(owner, repo);

  return { name: `${owner}/${repo}`, issues };
});

export const fetchRepoData = createAsyncThunk<FetchedRepoData, FetchDataArgs>(
  "currentRepo/fetchRepo",
  async ({ owner, repo }, { dispatch }) => {
    const repoData = await fetchRepo(owner, repo);
    const stars = Math.round(repoData.stargazers_count / 1000);

    dispatch(fetchIssuesData({ owner, repo }));

    return { name: `${owner}/${repo}`, stars };
  }
);
