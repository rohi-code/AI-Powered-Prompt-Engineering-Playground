import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example dynamic input
const city = "Paris";
const activity = "best places to eat";

async function runDynamicPrompt() {
  // dynamically build the user prompt using variables
  const dynamicPrompt = `I am traveling to ${city}. Can you suggest the ${activity}?`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a knowledgeable travel assistant." },
      { role: "user", content: dynamicPrompt },
    ],
    temperature: 0.7,
  });

  console.log("Dynamic Prompt:", dynamicPrompt);
  console.log("LLM Response:", response.choices[0].message.content.trim());
}

runDynamicPrompt();
