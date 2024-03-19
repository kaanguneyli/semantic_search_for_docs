//import { Response } from 'express'; // npm install express

export async function POST (req) {
  const { test } = await req.json();
  try {
    console.log('zıbab ıvvj:', test);
    return new Response(JSON.stringify(test), {
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


// create embeddings using the data received from the client

// send the embeddings to upstash vector