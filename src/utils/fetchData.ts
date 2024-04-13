import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "token",
});

export const fetchData = async (owner, repo) => {
  try {
    const githubData = await octokit.request(
      "GET /repos/{owner}/{repo}/issues",
      { owner, repo }
    );

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
