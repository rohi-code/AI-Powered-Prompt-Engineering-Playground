import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runStructuredOutput() {
  const prompt = `
You are an assistant that provides movie information in a strict JSON format.
Please return the following fields:
- title (string)
- director (string)
- year (integer)
- rating (float)

Movie Name: Inception
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that outputs structured JSON." },
      { role: "user", content: prompt },
    ],
    temperature: 0,
  });

  const output = response.choices[0].message.content.trim();
  console.log("Structured JSON Output:\n", output);

  // Optional: parse the JSON
  try {
    const movieData = JSON.parse(output);
    console.log("Parsed JSON Object:", movieData);
  } catch (err) {
    console.error("Error parsing JSON:", err);
  }
}

runStructuredOutput();
