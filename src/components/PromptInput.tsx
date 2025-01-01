import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateCode, createProject } from "@/services/api";
import { useProjects } from "@/hooks/use-projects";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { createProject: createProjectMutation } = useProjects();

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
      const { result } = await generateCode(prompt);
      
      // Создаем новый проект
      await createProjectMutation.mutateAsync({
        name: `Проект от ${new Date().toLocaleDateString()}`,
        description: result
      });

      toast({
        title: "Успешно",
        description: "Код успешно сгенерирован и сохранен",
      });
      
      setPrompt("");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сгенерировать код",
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