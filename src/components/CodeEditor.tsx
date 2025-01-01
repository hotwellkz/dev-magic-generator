import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface CodeEditorProps {
  code: string;
}

export const CodeEditor = ({ code }: CodeEditorProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success("Код скопирован в буфер обмена");
      
      // Reset copy state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Не удалось скопировать код");
    }
  };

  return (
    <div className="relative border rounded-lg">
      <div className="absolute right-2 top-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={copyToClipboard}
          className="transition-all duration-200"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
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