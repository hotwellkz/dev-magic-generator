import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
}

export const CodeEditor = ({ code }: CodeEditorProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Скопировано",
        description: "Код скопирован в буфер обмена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать код",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative border rounded-lg">
      <div className="absolute right-2 top-2">
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[500px] w-full">
        <pre className="p-4 text-sm">
          <code>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};