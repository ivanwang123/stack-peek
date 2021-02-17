import { RepoType } from "../types/customTypes";

const PAGE_SIZE = 10;

const fetchDependencies = async (username: string, repo: any) => {
  const res = await fetch(
    `/api/dependency/retrieve?${new URLSearchParams({
      username: username,
      repository: repo.name,
    })}`
  );
  const data = await res.json();

  if (data.dependencies.length) {
    const repoData: RepoType = {
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      size: repo.size,
      created_at: repo.created_at,
      dependencies: data.dependencies,
    };
    return repoData;
  }
  return null;
};

export const fetchRepos = async (params: any) => {
  const { queryKey, pageParam = 0 } = params;

  if (queryKey[1].length) {
    const repoRes = await fetch(
      `https://api.github.com/users/${queryKey[1]}/repos?page=${pageParam}&per_page=${PAGE_SIZE}&sort=created`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const repoData = await repoRes.json();

    if (repoData) {
      const promises: Promise<RepoType | null>[] = [];
      repoData.forEach(async (repo: any) => {
        promises.push(fetchDependencies(queryKey[1], repo));
      });

      let repos = await Promise.all(promises);
      repos = repos.filter((repo) => repo !== null);
      return repos;
    }
    return [];
  }
  return [];
};
