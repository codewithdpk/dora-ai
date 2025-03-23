import { useState } from "react";
import { Thread } from "../types/messages";

export function useThreadStream() {
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  async function send(prompt: string) {
    if (thread && thread?.thread_id) {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          initial_prompt: prompt,
          thread_id: thread.thread_id,
        }),
      });

      const data = await res.json();
      setThread(data);
      setLoading(false)
    } else {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          initial_prompt: prompt,
        }),
      });

      const data = await res.json();
      setThread(data);
      setLoading(false)
    }
    
  }

  return { thread, loading, send };
}
