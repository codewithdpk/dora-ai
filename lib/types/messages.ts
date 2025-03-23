
export type MessagePartType = "text" | "json" | "code" | "file" | "button"

export type MessageRole = 'ai' | 'human' | 'tool_call'

export interface MessagePart {
    type: MessagePartType
    content: string | Record<string, any> | Blob 
}

export interface Message {
    id: string;
    thread_id: string
    role: MessageRole
    parts: MessagePart[];
    timestamp: number;
}

export interface Thread {
    thread_id: string;
    messages: Message[];
}

export interface ToolcallOutput {
    explanation: string
    generated_code: string
}