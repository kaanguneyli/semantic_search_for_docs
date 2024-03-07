import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain

const octokit = new Octokit();

const parseMarkdowns = async (owner, repo) => {
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
      owner,
      repo,
    });
    const markdowns = response.data.filter(file => {
      return file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'));
    });

    const contents = await Promise.all(markdowns.map(async (file) => {
      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path: file.path,
      });
      // Decode the content from base64
      return Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    }));

    //return contents;
    const output = await splitter.createDocuments(contents);

    return output;
    
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
  
export { parseMarkdowns };