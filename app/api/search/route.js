export async function GET(req) {
    const query = await req.query;
    console.log(typeof query);
    try {
        const searchResults = await search(query);
        return new Response(JSON.stringify({ searchResults }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
    // Assuming search() returns an array of results
    
  }
  
  async function search(query) {
    return [query, query, query];
  }