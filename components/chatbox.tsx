"use client";

import { useState } from "react";
import ThreadComponent from "./Message";
import { Button } from "./ui/Button";
import { useThreadStream } from "@/lib/hooks/useThreadStream";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function Chatbox() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [prompt, setPrompt] = useState("");

  const { thread, loading, send } = useThreadStream();

  function handleOpenCodePreview() {
    setIsPreviewOpen((prevValue) => !prevValue);
  }

  async function handlePromptTrigger() {
    if (prompt && prompt.trim().length > 0) {
      await send(prompt);
      setPrompt("");
    }
  }

  const codeBlockMessage = thread?.messages[thread?.messages.length - 1]
  const codePart = codeBlockMessage && codeBlockMessage?.parts?.find(part => part.type === "code")

  const threadWithoutPreview = (
    <div className="min-h-screen grid grid-cols-6 gap-4 p-4">
      <div></div>
      <div className="col-span-4 flex flex-col relative">
        <div className="flex min-h-[80%]">
          <ThreadComponent
            thread={thread}
            handleOpenCodePreview={handleOpenCodePreview}
          />
        </div>

        <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-2xl absolute bottom-0">
          <div className="flex flex-row items-center gap-2">
            <textarea
              className="text-sm text-white bg-gray-800 outline-none flex-1 p-2 rounded mr-2"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <Button variant="primary" className="" onClick={handlePromptTrigger}>
              Send
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );

  const threadWithPreview = (
    <div className="min-h-screen grid grid-cols-6 gap-4 p-4">
      <div className="col-span-2 flex flex-col relative">
        <div className="flex min-h-[80%]">
          <ThreadComponent
            thread={thread}
            handleOpenCodePreview={handleOpenCodePreview}
          />
        </div>

        <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-2xl absolute bottom-0">
          <div className="flex flex-row items-center gap-2">
            <textarea
              value={prompt}
              className="text-sm text-white bg-gray-800 outline-none flex-1 p-2 rounded mr-2"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <Button
              isLoading={loading}
              variant="primary"
              className=""
              onClick={handlePromptTrigger}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-4 h-full">
        <Sandpack
          template="react"
          theme={"dark"}
          files={{
            "/App.js": codePart?.content,
          }}
          options={{
            editorHeight: "95vh",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {isPreviewOpen ? threadWithPreview : threadWithoutPreview}
    </div>
  );
}
