import { Index } from "@upstash/vector";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function GET(req) {
    //const query = await req.query;
    //console.log(typeof query);
    const url = new URL(req.url);
    const topK = 3;
    
    try {
        const searchParam = new URLSearchParams(url.searchParams);
        const query = searchParam.get('query');
        const index = new Index({
            url: process.env.UPSTASH_VECTOR_REST_URL,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN,
        });
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "text-embedding-3-small",
        });
        const embed_query = await embeddings.embedDocuments([query]);
        const result = await index.query({
            vector: embed_query[0],
            topK: topK,
            includeVectors: true,
            includeMetadata: true
        });
        //const result_json = JSON.stringify(result.metadata);
        let response = [];
        result.forEach((element) => {
            console.log(element.metadata._pageContentLC, '\n') ;
            console.log(element.metadata.name, '\n\n'); // loc eklemek gerekebilir
            const res_one = [element.metadata._pageContentLC, element.metadata.path];
            response.push(res_one);
        });
        //console.log(result_json);

        return new Response(response, {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
  }