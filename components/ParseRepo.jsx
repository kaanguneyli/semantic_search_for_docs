import { Octokit } from "@octokit/core";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";  // npm install -S langchain
import { Document } from "langchain/document";

const octokit = new Octokit();  // Github API client

const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 500,  // You can change this according to your needs
  chunkOverlap: 0,   // You can change this according to your needs
});


const parseMarkdowns = async (owner, repo, path = '') => {

  try {
    // Access the directory using GitHub API
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
    });
    const files = response.data;

    // Filter out the Markdown files
    const markdowns = files.filter(file => {
      return file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'));
    });

    // Filter out the directories
    const directories = files.filter(file => file.type === 'dir');

    // Get the contents of the Markdown files
    const contents = await Promise.all(markdowns.map(async (file) => {
      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path: file.path,
      });

      // Decode the content from base64
      const content = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');

      // Create a Document object using the content from the Markdown file
      const document = new Document({ metadata: {name: file.path}, pageContent: content });
      return document;
      
    }));

    //accumulatedContents.push(...contents);
    // Recursively search subdirectories for Markdown files
    for (const directory of directories) {
      await parseMarkdowns(owner, repo, directory.path);
    }
    //const output = await splitter.splitDocuments(accumulatedContents);

    // Split the documents into chunks and post them to the api
    let output = [];
    output = await splitter.splitDocuments(contents);
    try {
      const response = await fetch('/api/addDocument', {
        method: 'POST',
        body: JSON.stringify(output),
      });
      return JSON.stringify(response);
      
    } catch (error) { 
      console.error("Error in POST:", error);
      return output;
    }

  } catch (error) {
    console.error("Error in GET:", error);
    return [];
  }
};
  
export { parseMarkdowns };