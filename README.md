## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisities)
- [How to Install](#how-to-install)
- [How to Use](#how-to-use)
- [Deploy on Vercel](#deploy-on-vercel)

## Project Description

This is a Next.js project developed using Javascript which creates a semantic search engine for any Github repository given by the user. The program reads the markdown files, creates chunks of max size 500 and stores them in Upstash Vector database using Langchain and OpenAI Embeddings. Once the files are stored in the database users are able to search queries too.

If you have questions, you can check out the blog post which contains detailed explanation of the project from [here](). Also, feel free to create issues on the repository.

## Prerequisities

1. Create an Upstash Vector Index
2. Get an OpenAI API Key

## How to Install

To install the project on your local device in order to make changes or run it, you can follow these steps:

1. Install the source code to your device

```bash
git clone https://github.com/kaanguneyli/semantic_search_for_docs.git
```

2. Go to the project folder

```bash
cd semantic_search_for_docs
```

3. Install `next` if not installed already

```bash
npm install next
```

4. Create a `.env` file and fill it with your API keys.

```bash
# .env

UPSTASH_VECTOR_REST_URL="..."
UPSTASH_VECTOR_REST_TOKEN="..."
OPENAI_API_KEY="..."
```

5. Run the project

```bash
npm run dev
```

6. Go to `https://localhost:3000/` or `https://localhost:3000/api/search?query=your-input`

## How to Use

Once you run the program, you will see two forms and one submit button.

First form will have the prompt `Owner name` and second will have `Repo name`. Fill these spaces according to your Github repository (For example 'Upstash' and 'Docs'). The program will create the embeddings and upsert them to your index.

If you use the search endpoint the program will return 3 results which resemble most to your query, you can also see the file's names on the screen.

## Deploy on Vercel

You can deploy to project using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js using the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/kaanguneyli/semantic_search_for_docs/tree/master/nextjs)