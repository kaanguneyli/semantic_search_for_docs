//import { Response } from 'express'; // npm install express

// use post method to receive data from ParseRepo.jsx

//export const POST = (req) => {
//  const { test } = req.body;
//  try {
//    console.log('test:', test);
//    return test;
//  } catch (error) {
//    console.error("Error fetching files:", error);
//    return [];
//  }
//};

export async function POST (req) {
  const { test } = await req.json();
  try {
    console.log('test:', test);
    return new Response(JSON.stringify(test), {
      //headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      //headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}