import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain
//import { promises as fs } from 'fs';
import { Document } from "langchain/document";

const octokit = new Octokit();

const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 500,
  chunkOverlap: 0,
});

const parseMarkdowns = async (owner, repo, path = '', accumulatedContents = []) => {

//const test = ["This is a test document.", "Yes, indeed.", "Weird stuff."];

  const test = [
    new Document({
      metadata: {name: 'id'},
      pageContent: "This is a test document.",
    }),
    new Document({
      metadata: {name: 'id'},
      pageContent: "Yes, indeed.",
    }),
    new Document({
      metadata: {name: "id"},
      pageContent: "Weird stuff.",
    }),
  ];
  
  try {
    const response = await fetch('/api/addDocument', {
      method: 'POST',
      body: JSON.stringify({ test }),
    });
    return test;
  } catch (error) { 
    console.error("Error fetching files:", error);
    return test;
  }

//  try {
//    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//      owner,
//      repo,
//      path,
//    });
//    const files = response.data;
//    const markdowns = files.filter(file => {
//      return file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'));
//    });
//    const directories = files.filter(file => file.type === 'dir');
//    let contents = [];
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
//    const output = await splitter.createDocuments(accumulatedContents);
//    const output_json = JSON.stringify({ output });
//    console.log('output_json:', output_json);
//    try {
//      const response = await fetch('/api/addDocument', {
//        method: 'POST',
//        body: output_json,
//      });
//      return output;
//    } catch (error) { 
//      console.error("Error fetching files:", error);
//      return output;
//    }
//    
//  } catch (error) {
//    console.error("Error fetching files:", error);
//    return [];
//  }
};
  
export { parseMarkdowns };