import { AzureOpenAI } from "openai";
import { ChatCompletionTool } from "openai/resources/chat";

export async function chat(prompt: string) {
  const client = new AzureOpenAI();

  const tools: ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "generate_code_components",
        description:
          "Generates a fault-tolerant, self-contained React component file based on user input. The generated code includes all necessary component definitions within a single file, along with the proper default export of main wrapper. The function ensures proper error handling and code structure to maintain robustness and reusability.",
        parameters: {
          type: "object",
          properties: {
            explanation: {
              type: "string",
              description: "Explanation of the generated component.",
            },
            generated_code: {
              type: "string",
              description: "react code string.",
            },
          },
          required: ["explanation", "generated_code"],
        },
      },
    },
  ];

  const events = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    tools: tools,
    model: 'gpt-4o'
  });

  return events
}
