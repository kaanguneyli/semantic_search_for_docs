//import { Response } from 'express'; // npm install express
import { Index } from "@upstash/vector"; // npm install -S @upstash/vector
import { OpenAIEmbeddings } from "@langchain/openai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash"; 
import { Document } from "langchain/document";

export async function POST (req) {
  const data = await req.json();     // bundan sonra bunun tipinin document olup olmadığını anlamanın tek yolu tüm kodu çalıştırmak
  //const data_json = JSON.stringify(data);
  try {
    console.log(JSON.stringify( data ));
    //const documents = JSON.parse(jsonData);
    //  new Document ({
    //      metadata: item.metadata,
    //      pageContent: item.pageContent
    //  });
    //}); 
    //documents.forEach((element, index) => {
    //  console.log(`Element at index ${index} has type: ${typeof element}`);
    //});
    const index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN,
    });
    
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,     // In Node.js defaults to process.env.OPENAI_API_KEY
      //batchSize: 256,       // bunun ne olduğunu öğren
      modelName: "text-embedding-3-small",
    });
    
    const UpstashVector = new UpstashVectorStore(embeddings, { index });
    await UpstashVector.addDocuments(data);

    return new Response(JSON.stringify(data), {
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
