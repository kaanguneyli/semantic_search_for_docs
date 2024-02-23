import { Octokit } from "@octokit/core";

const octokit = new Octokit();

const fetchMarkdowns = async (owner, repo) => {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
      owner,
      repo,
    });
    const markdowns = response.data.filter(file => {
      return file.name.endsWith('.md') || file.name.endsWith('.mdx');
    });
    return markdowns;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
  
  export { fetchMarkdowns };