import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// read multi-shot examples from file
const prompt = fs.readFileSync("prompts/multi_shot.txt", "utf-8");

async function runMultiShot() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  console.log("LLM Response:", response.choices[0].message.content.trim());
}

runMultiShot();
