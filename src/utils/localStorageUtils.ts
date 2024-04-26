export interface AddList {
  [key: string]: {
    id: string;
    index: number;
    title: string;
    number: number;
    comments: number;
    assignee: null | Partial<{ login: string }>;
    created_at: Date;
  };
}

export interface RemoveList {
  [key: string]: number;
}

export const getRemovedIssuesByColumn = (repoName, columnName) => {
  const storageState = JSON.parse(localStorage.getItem(repoName));

  if (!storageState) return { count: 0, issuesToRemove: {} };

  const removeList = storageState[columnName].removeList;

  return {
    count: Object.keys(removeList).length,
    issuesToRemove: removeList as RemoveList,
  };
};

const getAddedIssuesByColumn = (repoName, columnName) => {
  const storageState = JSON.parse(localStorage.getItem(repoName));

  if (!storageState) return { count: 0, issuesToAdd: {} };

  const addList = storageState[columnName].addList;

  return {
    count: Object.keys(addList).length,
    issuesToAdd: addList as AddList,
  };
};

export const resolveIssuesList = (repoName, columnName, fetchedIssues) => {
  const { issuesToRemove } = getRemovedIssuesByColumn(repoName, columnName);
  const { issuesToAdd } = getAddedIssuesByColumn(repoName, columnName);

  const filteredFetchedIssues = fetchedIssues.filter(
    (issue) => !(issue.id in issuesToRemove)
  );

  const sortedIssuesToAdd = Object.values(issuesToAdd).sort(
    (a, b) => a.index - b.index
  );

  const resolvedIssues = Array(filteredFetchedIssues.length);

  sortedIssuesToAdd.forEach((issueToAdd) => {
    resolvedIssues[issueToAdd.index] = issueToAdd;
  });

  filteredFetchedIssues.forEach((issue, currentIndex) => {
    if (!resolvedIssues[currentIndex]) {
      resolvedIssues[currentIndex] = issue;
    }
  });

  return resolvedIssues;
};
