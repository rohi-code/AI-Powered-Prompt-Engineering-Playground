import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbeddings() {
  // Example texts
  const texts = [
    "The capital of France is Paris.",
    "The Eiffel Tower is in Paris.",
    "Python is a programming language."
  ];

  for (const text of texts) {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small", // or "text-embedding-3-large" for higher accuracy
      input: text
    });

    const embedding = response.data[0].embedding;
    console.log("Text:", text);
    console.log("Embedding length:", embedding.length);
    console.log("First 5 values:", embedding.slice(0, 5));
    console.log("----------------------------");
  }
}

generateEmbeddings();
