import { Message, MessagePartType, Thread } from "@/lib/types/messages";
import React from "react";

import { RiCodeSSlashLine } from "@remixicon/react";

interface MessageProps {
  message: Message;
  handleOpenCodePreview: Function
}

const MessageComponent: React.FC<MessageProps> = ({ message , handleOpenCodePreview}) => {
  const renderMessagePart = (part: MessagePartType, content: any) => {
    switch (part) {
      case "text":
        return <p className="text-sm">{content}</p>;
      case "json":
        return (
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(content, null, 2)}
          </pre>
        );
      case "code":
        return (
          <div className="text-white mt-4 w-[220px] cursor-pointer" onClick={() => handleOpenCodePreview(message)}>
            <div className="flex  flex-row items-center rounded-md border border-gray-800">
              <div className="flex flex-row items-center p-4 border-r border-gray-800">
                <RiCodeSSlashLine className="h-5 w-5 text-gray-500" />
              </div>

              <div className="flex flex-col gap-1 ml-3">
                <p className="text-xs">Code Snippet</p>
                <p className="text-xs text-gray-400">Click to open preview</p>
              </div>
            </div>
          </div>
        );
      case "file":
        return (
          <a
            href={URL.createObjectURL(content)}
            download
            className="text-blue-500"
          >
            Download File
          </a>
        );
      case "button":
        return (
          <button className="bg-blue-500 text-white p-2 rounded">
            {content}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex ${
        message.role === "ai" ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`px-4 py-2 text-white ${
          message.role === "human" ? "rounded-3xl border border-gray-800" : ""
        }`}
      >
        {message.parts.map((part, index) => (
          <div key={index} className="mb-0">
            {renderMessagePart(part.type, part.content)}
          </div>
        ))}
        {/* <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span> */}
      </div>
    </div>
  );
};

interface ThreadProps {
  thread: Thread | null;
  handleOpenCodePreview: Function
}

const ThreadComponent: React.FC<ThreadProps> = ({ thread, handleOpenCodePreview }) => {
  return (
    <div className="p-4">
      {thread &&
        thread.messages.map((message) => (
          <MessageComponent key={message.id} message={message} handleOpenCodePreview={handleOpenCodePreview} />
        ))}
    </div>
  );
};

export default ThreadComponent;
