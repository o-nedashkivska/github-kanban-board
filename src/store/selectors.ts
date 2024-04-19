export const getCurrentRepo = (state) => state.currentRepo;

export const getCurrentRepoName = (state) => {
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

const getIssues = (state) => state.issues;

export const getCurrentIssues = (state) => {
  const currentRepoName = getCurrentRepoName(state);
  const currentIssues = getIssues(state);

  return currentIssues.allIssuesByRepo[currentRepoName];
};

export const getCurrentIssuesStatus = (state) => {
  const currentRepo = getIssues(state);
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
