import {
  createThread,
  parseToolcallMessageToThreadMessage,
  retriveThread,
} from "@/lib/actions";
import { chat } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function GET(thread_id: string) {
  const thread = await retriveThread(thread_id);
  return NextResponse.json(thread);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.thread_id) {
    const thread = await createThread(body.initial_prompt);

    const chatRes = await chat(body.initial_prompt);

    const updatedThread = await parseToolcallMessageToThreadMessage(
      chatRes,
      thread.thread_id
    );

    return NextResponse.json(updatedThread);
  } else {
    const thread = await retriveThread(body.thread_id);
    const chatRes = await chat(body.initial_prompt);

    const updatedThread = await parseToolcallMessageToThreadMessage(
      chatRes,
      thread.thread_id
    );

    return NextResponse.json(updatedThread);
  }
}

//   export async function PUT() {
//     return new Response("PUT request received", { status: 200 });
//   }

//   export async function DELETE() {
//     return new Response("DELETE request received", { status: 200 });
//   }
