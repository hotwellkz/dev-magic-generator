import { ScrollArea } from "@/components/ui/scroll-area";

export const CodePreview = () => {
  return (
    <div className="h-full border-l">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Код</h2>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-4">
          <pre className="text-sm">
            <code>// Здесь будет отображаться сгенерированный код</code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
};