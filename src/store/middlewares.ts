import { createListenerMiddleware } from "@reduxjs/toolkit";
import { changeIssueStatus } from "./issuesSlice";
import { RootState } from "./index";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: changeIssueStatus,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const currentRepoName = state.currentRepo.name;
    const currentIssues = state.issues.allIssuesByRepo[currentRepoName];

    const issuesIds = Object.entries(currentIssues).reduce(
      (result, [columnName, issues]) => {
        result[columnName] = issues.map((issue) => issue.id);
        return result;
      },
      {}
    );

    localStorage.setItem(currentRepoName, JSON.stringify(issuesIds));
  },
});

export default listenerMiddleware;
