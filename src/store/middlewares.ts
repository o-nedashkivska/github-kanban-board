import { createListenerMiddleware } from "@reduxjs/toolkit";
import { changeIssueStatus } from "./issuesSlice";
import { RootState } from "./index";

import { AddList, RemoveList } from "../utils/localStorageUtils";

const initialLocalStorageState = {
  toDo: {
    addList: {} as AddList,
    removeList: {} as RemoveList,
  },
  inProgress: {
    addList: {} as AddList,
    removeList: {} as RemoveList,
  },
  done: {
    addList: {} as AddList,
    removeList: {} as RemoveList,
  },
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: changeIssueStatus,
  effect: async (action, listenerApi) => {
    const { repoName, source, destination } = action.payload;

    const state = listenerApi.getState() as RootState;

    const { droppableId: oldColumnName, index: oldIndex } = source;
    const { droppableId: newColumnName, index: newIndex } = destination;

    const currentIssues = state.issues.allIssuesByRepo[repoName];
    const {
      id: currentIssueId,
      title,
      number,
      comments,
      assignee,
      created_at,
    } = currentIssues[newColumnName][newIndex];

    const issueData = {
      id: currentIssueId,
      title,
      number,
      comments,
      assignee,
      created_at,
    };

    const storageData =
      JSON.parse(localStorage.getItem(repoName)) ?? initialLocalStorageState;

    const oldColumn = storageData[oldColumnName];
    if (
      oldColumn.addList[currentIssueId] ||
      oldColumn.addList[currentIssueId]?.index === 0
    ) {
      // delete item from add list if it was added and then removed
      delete oldColumn.addList[currentIssueId];
    } else {
      // add item to remove list if it was removed
      oldColumn.removeList[currentIssueId] = oldIndex;
    }
    // shift indexes of replaced elements
    Object.values(oldColumn.addList as AddList).forEach((issue) => {
      if (newColumnName === oldColumnName) {
        if (issue.index > oldIndex && issue.index <= newIndex) {
          oldColumn.addList[issue.id].index -= 1;
        }
      } else {
        if (issue.index > oldIndex) {
          oldColumn.addList[issue.id].index -= 1;
        }
      }
    });

    const newColumn = storageData[newColumnName];
    if (newColumn.removeList[currentIssueId] === newIndex) {
      // delete item from remove list if it was removed and then added at the same index
      delete newColumn.removeList[currentIssueId];
    } else {
      // shift indexes of replaced elements
      Object.values(newColumn.addList as AddList).forEach((issue) => {
        if (newColumnName === oldColumnName) {
          if (issue.index >= newIndex && issue.index < oldIndex) {
            newColumn.addList[issue.id].index += 1;
          }
        } else {
          if (issue.index >= newIndex) {
            newColumn.addList[issue.id].index += 1;
          }
        }
      });

      // add item to add list if it was added
      newColumn.addList[currentIssueId] = {
        index: newIndex,
        ...issueData,
      };
    }

    localStorage.setItem(repoName, JSON.stringify(storageData));
  },
});

export default listenerMiddleware;
