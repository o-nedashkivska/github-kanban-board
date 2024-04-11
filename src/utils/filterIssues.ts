export const filterIssues = (issues: any) => {
  const toDo = [];
  const inProgress = [];
  const done = [];

  for (let issue of issues) {
    if (issue.state === "closed") done.push(issue);
    else if (issue.assignee) inProgress.push(issue);
    else toDo.push(issue);
  }

  return [toDo, inProgress, done];
};
