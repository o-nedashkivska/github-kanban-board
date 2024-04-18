export const getCurrentRepo = (state) => state.currentRepo;

const getCurrentRepoName = (state) => {
  const currentRepo = getCurrentRepo(state);
  return currentRepo.name;
};

export const getCurrentRepoStatus = (state) => {
  const currentRepo = getCurrentRepo(state);
  return currentRepo.status;
};

export const getCurrentRepoStatusReason = (state) => {
  const currentRepo = getCurrentRepo(state);
  return currentRepo.statusReason;
};

const getCurrentIssues = (state) => state.issues;

export const getCurrentIssuesSelector = (state) => {
  const currentRepoName = getCurrentRepoName(state);
  const currentIssues = getCurrentIssues(state);

  return currentIssues.allIssuesByRepo[currentRepoName];
};

export const getCurrentIssuesStatus = (state) => {
  const currentRepo = getCurrentIssues(state);
  return currentRepo.status;
};

export const getDataIsLoading = (state) => {
  const repoStatus = getCurrentRepoStatus(state);
  const issuesStatus = getCurrentIssuesStatus(state);

  const issuesLoading = Object.values(issuesStatus).some(
    (status) => status === "loading"
  );
  return issuesLoading || repoStatus === "loading";
};
