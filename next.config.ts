import type { NextConfig } from "next";

const githubPagesRepo = "klinika-warszawa-pages";
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPagesBuild ? "export" : undefined,
  basePath: isGithubPagesBuild ? `/${githubPagesRepo}` : undefined,
  assetPrefix: isGithubPagesBuild ? `/${githubPagesRepo}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPagesBuild ? `/${githubPagesRepo}` : "",
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
