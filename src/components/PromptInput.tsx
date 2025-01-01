import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите текст промпта",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/code/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, model: "openai" }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при генерации кода");
      }

      const data = await response.json();
      toast({
        title: "Успешно",
        description: "Код успешно сгенерирован",
      });
      setPrompt("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать код",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Опишите код, который хотите сгенерировать..."
        className="min-h-[100px]"
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Генерация..." : "Сгенерировать код"}
      </Button>
    </div>
  );
};