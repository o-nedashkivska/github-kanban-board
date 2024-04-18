import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "token",
});

const fetchData = async (url, options) => {
  try {
    const githubData = await octokit.request(url, options);

    return githubData.data;
  } catch (e: any) {
    if (e.status === 404) {
      console.log(
        "There is no such owner with the specified repository. Please enter valid repository url."
      );
    } else {
      console.log(e.message || "Something went wrong. Please try again.");
    }
  }
};

export const fetchRepo = async (owner, repo) => {
  return await fetchData("GET /repos/{owner}/{repo}", { owner, repo });
};

export const fetchIssues = async (owner, repo) => {
  return await fetchData("GET /repos/{owner}/{repo}/issues", { owner, repo });
};
