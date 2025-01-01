import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FileManager = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-full transition-all duration-300",
      isCollapsed ? "w-[50px]" : "w-[300px]"
    )}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className={cn(
          "font-semibold transition-opacity duration-300",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          Файлы проекта
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className={cn(
        "h-[calc(100%-57px)] transition-opacity duration-300",
        isCollapsed ? "opacity-0" : "opacity-100"
      )}>
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              <span>src</span>
            </div>
            <div className="ml-4 space-y-2">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>index.js</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};