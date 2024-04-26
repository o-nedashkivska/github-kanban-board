import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { fetchRepo, fetchIssues } from "../utils/fetchData";
import { getRemovedIssuesByColumn } from "../utils/localStorageUtils";
import { changeLoadingStatus } from "./issuesSlice";

type IssueStatus = "toDo" | "inProgress" | "done";

interface FetchDataArgs {
  owner: string;
  repo: string;
}

interface FetchedRepoData {
  name: string;
  stars: number;
}

interface FetchIssuesArgs {
  owner: string;
  repo: string;
  columnName: IssueStatus;
}

interface FetchedIssuesData {
  name: string;
  columnName: IssueStatus;
  issues: Array<any>;
}

interface Options {
  state?: "open" | "closed" | "all";
  per_page: number;
  assignee?: string;
}

export const fetchIssuesDataByStatus = createAsyncThunk<
  FetchedIssuesData,
  FetchIssuesArgs
>(
  "issues/fetchIssues",
  async ({ owner, repo, columnName }, { getState, dispatch }) => {
    dispatch(changeLoadingStatus({ columnName, status: "loading" }));

    const state = getState() as RootState;

    const { count: deletedIssuesCount } = await getRemovedIssuesByColumn(
      state.currentRepo.name,
      columnName
    );

    let additionalOptions: Options = {
      per_page: state.issues.limit + deletedIssuesCount,
    };

    switch (columnName) {
      case "toDo":
        additionalOptions.assignee = "none";
        break;
      case "inProgress":
        additionalOptions.assignee = "*";
        break;
      case "done":
        additionalOptions.state = "closed";
        if (additionalOptions.per_page === Infinity) {
          additionalOptions.per_page = 250 + deletedIssuesCount;
        }
    }

    let issues = await fetchIssues({ owner, repo, ...additionalOptions });

    return { name: `${owner}/${repo}`, columnName, issues };
  }
);

const fetchIssuesData = createAsyncThunk<void, FetchDataArgs>(
  "issues/fetchIssues",
  async ({ owner, repo }, { dispatch }) => {
    dispatch(fetchIssuesDataByStatus({ owner, repo, columnName: "toDo" }));
    dispatch(
      fetchIssuesDataByStatus({ owner, repo, columnName: "inProgress" })
    );
    dispatch(fetchIssuesDataByStatus({ owner, repo, columnName: "done" }));
  }
);

export const fetchRepoData = createAsyncThunk<FetchedRepoData, FetchDataArgs>(
  "currentRepo/fetchRepo",
  async ({ owner, repo }, { dispatch }) => {
    const repoData = await fetchRepo({ owner, repo });
    const stars = Math.round(repoData.stargazers_count / 1000);

    dispatch(fetchIssuesData({ owner, repo }));

    return { name: `${owner}/${repo}`, stars };
  }
);
