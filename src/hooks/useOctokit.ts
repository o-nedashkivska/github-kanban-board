import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const useOctokit = (owner: string, repo: string) => {
  const [data, setData] = useState<OctokitResponse<any>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const githubData = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          { owner, repo }
        );

        setData(githubData);
      } catch (e: any) {
        setError(e.message || "Failed to get data.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [owner, repo]);

  return { data, isLoading, error };
};

export default useOctokit;
