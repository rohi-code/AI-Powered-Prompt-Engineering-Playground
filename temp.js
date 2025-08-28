import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runTemperatureDemo() {
  const prompt = "Write a short creative story about a talking cat.";

  // Try with different temperatures
  const temps = [0.2, 0.7, 1.0];

  for (const temp of temps) {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative storyteller." },
        { role: "user", content: prompt },
      ],
      temperature: temp, // change creativity
      max_tokens: 100,
    });

    console.log(`\n--- Temperature: ${temp} ---`);
    console.log(response.choices[0].message.content.trim());
  }
}

runTemperatureDemo();
