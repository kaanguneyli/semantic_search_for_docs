//import { Response } from 'express'; // npm install express
import { Index } from "@upstash/vector"; // npm install -S @upstash/vector
import { OpenAIEmbeddings } from "@langchain/openai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash"; 
//import { Document } from "langchain/document";

export async function POST (req) {
  // Get the data from the request
  const data = await req.json();
  try {
    // Create an Index object
    const index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN,
    });
    
    // Create an OpenAIEmbeddings object
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
    });
    
    // Create a VectorStore object
    const vectorStore = new UpstashVectorStore(embeddings, { index });

    // Add the documents to the VectorStore
    await vectorStore.addDocuments(data);

    return new Response(JSON.stringify('Successful'), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
