import { randomUUID } from "crypto";
import { Message, Thread, MessagePart, ToolcallOutput } from "./types/messages";
import { redisClient } from "./redis";
import { ChatCompletion } from "openai/resources/chat";

export async function createThread(initial_prompt: string) {
  const redis = await redisClient();

  const thread_id = randomUUID();

  const message_part: MessagePart = {
    type: "text",
    content: String(initial_prompt),
  };
  const initialMessage: Message = {
    id: randomUUID(),
    thread_id: thread_id,
    role: "human",
    parts: [message_part],
    timestamp: 0,
  };
  const thread: Thread = {
    thread_id: thread_id,
    messages: [initialMessage],
  };

  await redis.set(thread_id, JSON.stringify(thread));

  return thread;
}

export async function retriveThread(thread_id: string) {
  const redis = await redisClient();

  const threadString = await redis.get(thread_id);

  if (!threadString) {
    throw new Error("Thread not found");
  }

  const thread: Thread = JSON.parse(threadString);

  return thread;
}

export async function parseToolcallMessageToThreadMessage(
  chatRes: ChatCompletion,
  thread_id: string
) {
  const redis = await redisClient();

  const tool_call_output: ToolcallOutput = JSON.parse(
    // @ts-ignore
    chatRes.choices[0].message.tool_calls[0].function.arguments as string
  );

  const message_part_1: MessagePart = {
    type: "text",
    content: tool_call_output.explanation,
  };

  const message_part_2: MessagePart = {
    type: "code",
    content: tool_call_output.generated_code,
  };

  const newMessage: Message = {
    id: randomUUID(),
    thread_id: thread_id,
    role: "tool_call",
    parts: [message_part_1, message_part_2],
    timestamp: 0,
  };

  const thread = await retriveThread(thread_id);

  const updatedThread = {
    ...thread,
    messages: [...thread.messages, newMessage],
  };

  redis.set(thread_id, JSON.stringify(updatedThread));

  return updatedThread
}
