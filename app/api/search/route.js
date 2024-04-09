import { Index } from "@upstash/vector";
import { OpenAIEmbeddings } from "@langchain/openai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash"; 

export async function GET(req) {

    // Parse the query from the URL
    const url = new URL(req.url);

    // Set the number of results to return
    const topK = 3;

    // Set the input prompt
    const prompt = 'query';
    
    try {
        // Get the query from the URL 
        const searchParam = new URLSearchParams(url.searchParams);
        const query = searchParam.get(prompt);

        // Create a new Index object
        const index = new Index({
            url: process.env.UPSTASH_VECTOR_REST_URL,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN,
        });
        
        // Create a new OpenAIEmbeddings object
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "text-embedding-3-small",
        });

        // Create a new UpstashVectorStore object
        const vectorStore = new UpstashVectorStore(embeddings, { index });

        // Perform a similarity search with the query
        const result = await vectorStore.similaritySearchWithScore(
            query,
            topK
          );

        // Create the response
        let response = [];
        result.forEach((element) => {
            const res_one = [element[0].pageContent, element[0].metadata.name, '\n\n\n'];
            response.push(res_one);
        });

        return new Response(response, {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
  }