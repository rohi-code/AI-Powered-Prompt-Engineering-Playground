import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example function schema
const functions = [
  {
    name: "get_weather",
    description: "Get the current weather for a given city",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "Name of the city to get the weather for"
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "Unit for temperature"
        }
      },
      required: ["city", "unit"]
    }
  }
];

async function runFunctionCalling() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a weather assistant." },
      { role: "user", content: "What is the weather in Chennai in celsius?" }
    ],
    functions,
    function_call: "auto" // let the model decide when to call
  });

  const message = response.choices[0].message;

  if (message.function_call) {
    console.log("Function Call Triggered:");
    console.log("Name:", message.function_call.name);
    console.log("Arguments:", message.function_call.arguments);

    // Here you would normally call your backend/weather API
    // Example mock implementation:
    const args = JSON.parse(message.function_call.arguments);
    if (message.function_call.name === "get_weather") {
      const mockWeather = {
        city: args.city,
        unit: args.unit,
        temperature: "32",
        condition: "Sunny"
      };
      console.log("Mock Weather Data:", mockWeather);
    }
  } else {
    console.log("LLM Response:", message.content);
  }
}

runFunctionCalling();
