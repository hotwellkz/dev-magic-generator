import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  type: "user" | "ai";
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      timestamp: new Date(),
      type: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setPrompt("");

    // TODO: Здесь будет логика обработки промта и генерации кода
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-4 rounded-lg ${
              message.type === "user"
                ? "bg-primary/10 ml-auto max-w-[80%]"
                : "bg-muted mr-auto max-w-[80%]"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <time className="text-xs text-muted-foreground mt-2">
              {message.timestamp.toLocaleString()}
            </time>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите, какой код вы хотите сгенерировать..."
            className="min-h-[60px]"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};