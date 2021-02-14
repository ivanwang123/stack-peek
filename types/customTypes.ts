export type DownloadType = {
  downloads: number;
  package: string;
  start: string;
  end: string;
};

export type DependecyType = {
  name: string;
  npmUrl: string;
};

export type RepoType = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  size: number;
  created_at: Date;
  dependencies: DependecyType[];
};

export type OwnerType = {
  name: string;
  bio: string;
  email: string;
  location: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
};
