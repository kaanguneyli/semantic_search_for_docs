//import { Response } from 'express'; // npm install express
import { Index } from "@upstash/vector"; // npm install -S @upstash/vector
import { OpenAIEmbeddings } from "@langchain/openai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash"; 
import { Document } from "langchain/document";


export async function POST (req) {
  const { test } = await req.json();
  try {
    console.log('zıbab ıvvj:', JSON.stringify( {test}));
    return new Response(JSON.stringify( {test} ), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
  catch (error) {
    console.log('error');
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

//const index = new Index({
//  url: process.env.UPSTASH_VECTOR_REST_URL,
//  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
//});
//
//const embeddings = new OpenAIEmbeddings({
//  openAIApiKey: process.env.OPENAI_API_KEY,     // In Node.js defaults to process.env.OPENAI_API_KEY
//  batchSize: 512,       // bunun ne olduğunu öğren
//  modelName: "text-embedding-3-small",
//});
//
//const UpstashVector = new UpstashVectorStore(embeddings, { index });
//await UpstashVector.addDocuments(test);