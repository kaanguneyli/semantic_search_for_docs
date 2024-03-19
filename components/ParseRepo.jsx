import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain

const octokit = new Octokit();

const parseMarkdowns = async (owner, repo, path = '', accumulatedContents = []) => {

  const test = ['This is a test document.', 'Yes, indeed.', 'Weird stuff.'];
  try {
    const response = await fetch('/api/addDocument', {
      method: 'POST',
      body: JSON.stringify({ test }),
    });
    console.log(response);
    return test;
  } catch (error) { 
    console.error("Error fetching files:", error);
    return [];
  }
  
//  const splitter = new RecursiveCharacterTextSplitter({
//    chunkSize: 500,
//    chunkOverlap: 0,
//  });
//
//  try {
//    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//      owner,
//      repo,
//      path,
//    });
//
//    const files = response.data;
//
//    const markdowns = files.filter(file => {
//      return file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'));
//    });
//
//    const directories = files.filter(file => file.type === 'dir');
//
//    let contents = [];
//    
//    // Fetch contents of Markdown files in the current directory
//    contents = await Promise.all(markdowns.map(async (file) => {
//      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//        owner,
//        repo,
//        path: file.path,
//      });
//      // Decode the content from base64
//      return Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
//    }));
//
//    // Concatenate contents to accumulatedContents
//    accumulatedContents.push(...contents);
//
//    // Recursively search subdirectories for Markdown files
//    for (const directory of directories) {
//      await parseMarkdowns(owner, repo, directory.path, accumulatedContents);
//    }
//
//    // If this is the initial call, process accumulated contents
//    //if (path === '') {
//    const output = await splitter.createDocuments(accumulatedContents);
//    try {
//      const response = await fetch('/api/addDocument', {
//        method: 'POST',
//        body: JSON.stringify({ output }),
//      });
//      console.log(response);
//      return output;
//    } catch (error) { 
//      console.error("Error fetching files:", error);
//      return output;
//    }
//    //}
//    
//  } catch (error) {
//    console.error("Error fetching files:", error);
//    return [];
//  }
};
  
export { parseMarkdowns };