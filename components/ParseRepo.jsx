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

    const contents = await Promise.all(markdowns.map(async (file) => {
      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path: file.path,
      });
      // Decode the content from base64 and return it
      return Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    }));

    return contents;
    
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
  
export { fetchMarkdowns };