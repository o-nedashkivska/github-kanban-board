export const getCurrentRepo = (state) => state.currentRepo;

const getCurrentRepoName = (state) => {
  const currentRepo = getCurrentRepo(state);
  return currentRepo.name;
};

export const getCurrentIssuesSelector = (state) => {
  const currentRepoName = getCurrentRepoName(state);
  return state.issues.allIssuesByRepo[currentRepoName];
};
