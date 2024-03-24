import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain
import { Document } from "langchain/document";

const octokit = new Octokit();

const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 500,
  chunkOverlap: 0,
});

const parseMarkdowns = async (owner, repo, path = '', accumulatedContents = []) => {

//  const test = [
//    new Document({
//      metadata: {path: 'file_1'},
//      pageContent: "This is a test document.",
//    }),
//    new Document({
//      metadata: {name: 'file_2'},
//      pageContent: "Yes, indeed.",
//    }),
//    new Document({
//      metadata: {name: 'file_3'},
//      pageContent: "Weird stuff.",
//    }),
//  ];
//  
//  try {
//    const response = await fetch('/api/addDocument', {
//      method: 'POST',
//      body: JSON.stringify(test),
//    });
//    return JSON.stringify({ test });
//  } catch (error) { 
//    console.error("Error fetching files:", error);
//    return test;
//  }



  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
    });
    const files = response.data;
    const markdowns = files.filter(file => {
      return file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'));
    });
    const directories = files.filter(file => file.type === 'dir');
    const contents = await Promise.all(markdowns.map(async (file) => {
      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path: file.path,
      });
      // Decode the content from base64
      const content = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
      const document = new Document({ metadata: {name: file.path}, pageContent: content });
      return document;
      
    }));

    //accumulatedContents.push(...contents);
    // Recursively search subdirectories for Markdown files
    for (const directory of directories) {
      await parseMarkdowns(owner, repo, directory.path, accumulatedContents);
    }
    //const output = await splitter.splitDocuments(accumulatedContents);
    let output = [];
    output = await splitter.splitDocuments(contents);
    try {
      const response = await fetch('/api/addDocument', {
        method: 'POST',
        body: JSON.stringify(output),
      });
      return JSON.stringify(response);
    } catch (error) { 
      console.error("Error fetching files:", error);
      return output;
    }
    
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
  
export { parseMarkdowns };