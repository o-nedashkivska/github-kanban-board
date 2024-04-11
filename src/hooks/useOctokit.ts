import { useEffect, useState } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "token",
});

const useOctokit = (owner: string, repo: string) => {
  const [data, setData] = useState<Array<any>>();
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

        setData(githubData.data);
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
