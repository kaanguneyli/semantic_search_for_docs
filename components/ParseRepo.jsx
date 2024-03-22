import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain
//import { promises as fs } from 'fs';
import { Document } from "langchain/document";

const octokit = new Octokit();

const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 1000,
  chunkOverlap: 0,
});

const parseMarkdowns = async (owner, repo, path = '', accumulatedContents = []) => {

//  //const test = ["This is a test document.", "Yes, indeed.", "Weird stuff."];

//  const test = [
//    new Document({
//      metadata: {name: 'id'},
//      pageContent: "This is a test document.",
//    }),
//    new Document({
//      metadata: {name: 'id'},
//      pageContent: "Yes, indeed.",
//    }),
//    new Document({
//      metadata: {name: "id"},
//      pageContent: "Weird stuff.",
//    }),
//  ];
//  
//  try {
//    const response = await fetch('/api/addDocument', {
//      method: 'POST',
//      body: JSON.stringify({ test }),
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
    //let contents = [];
    //contents = await Promise.all(markdowns.map(async (file) => {
    //  const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    //    owner,
    //    repo,
    //    path: file.path,
    //  });
      // Decode the content from base64
      const content = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
      const document = new Document({ metadata: {name: file.path}, pageContent: content });
      return document;
      
    }));

    accumulatedContents.push(...contents);
    // Recursively search subdirectories for Markdown files
    for (const directory of directories) {
      await parseMarkdowns(owner, repo, directory.path, accumulatedContents);
    }

    // If this is the initial call, process accumulated contents
    const output = await splitter.splitDocuments(accumulatedContents);
    // metadata'ya dosya adını koymamız gerekiyor
    const output_json = JSON.stringify({ output });
    //console.log('output_json:', output_json);
    try {
      const response = await fetch('/api/addDocument', {
        method: 'POST',
        body: output_json,
      });
      //return output;
      return output_json;
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