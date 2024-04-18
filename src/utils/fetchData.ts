import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "token",
});

export const fetchRepo = async (options) => {
  try {
    const githubData = await octokit.request(
      "GET /repos/{owner}/{repo}",
      options
    );

    return githubData.data;
  } catch (e: any) {
    if (e.status === 404) {
      throw new Error(
        "There is no such owner with the specified repository. Please enter valid repository url."
      );
    } else {
      throw new Error(e.message || "Something went wrong. Please try again.");
    }
  }
};

export const fetchIssues = async (options) => {
  try {
    const requestMethod = async (url, options) => {
      if (options.per_page === Infinity)
        return await octokit.paginate(url, { ...options, per_page: 100 });
      else {
        const { data } = await octokit.request(url, options);
        return data;
      }
    };

    const githubData = await requestMethod(
      "GET /repos/{owner}/{repo}/issues",
      options
    );

    return githubData;
  } catch (e: any) {
    throw new Error(e.message || "Something went wrong. Please try again.");
  }
};
