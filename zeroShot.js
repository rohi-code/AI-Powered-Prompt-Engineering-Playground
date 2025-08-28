import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runZeroShot() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Translate 'Good night' into French." }, // zero-shot: no examples
    ],
    temperature: 0.7,
  });

  console.log("LLM Response:", response.choices[0].message.content.trim());
}

runZeroShot();
