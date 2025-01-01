import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileManager } from "@/components/FileManager";
import { PromptInput } from "@/components/PromptInput";
import { CodeEditor } from "@/components/CodeEditor";
import { Files } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Code Generator</h1>
        <Sheet open={isFileManagerOpen} onOpenChange={setIsFileManagerOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Files className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <FileManager />
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-4">
              <PromptInput />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-4">
              <CodeEditor code={generatedCode} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;