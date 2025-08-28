import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runOneShotPrompt() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that translates English to French." },
      // One example (the "one shot")
      { role: "user", content: "Translate this: 'Good morning'" },
      { role: "assistant", content: "Bonjour" },
      // Now the actual query
      { role: "user", content: "Translate this: 'How are you?'" },
    ],
    temperature: 0.7,
  });

  console.log("LLM Response:", response.choices[0].message.content.trim());
}

runOneShotPrompt();
