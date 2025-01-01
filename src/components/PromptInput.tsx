import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { generateCode, saveProject } from "@/services/api";
import { Loader2 } from "lucide-react";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Пожалуйста, введите текст промпта");
      return;
    }

    setIsLoading(true);
    try {
      const generatedCode = await generateCode(prompt);
      
      // Сохраняем проект
      await saveProject(
        `Проект от ${new Date().toLocaleDateString()}`,
        prompt,
        generatedCode
      );

      toast.success("Код успешно сгенерирован и сохранен");
      setPrompt("");
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : "Не удалось сгенерировать код");
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
        disabled={isLoading}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Генерация...
          </>
        ) : (
          "Сгенерировать код"
        )}
      </Button>
    </div>
  );
};