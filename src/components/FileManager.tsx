import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, File, ChevronRight, ChevronDown, Code, FileText, Image } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return <Code className="h-4 w-4 text-yellow-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <Image className="h-4 w-4 text-blue-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

export const FileManager = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src']);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderPath) 
        ? prev.filter(p => p !== folderPath)
        : [...prev, folderPath]
    );
  };

  return (
    <div className={cn(
      "h-full transition-all duration-300 border-r bg-sidebar",
      isCollapsed ? "w-[50px]" : "w-[300px]"
    )}>
      <div className="p-4 border-b flex justify-between items-center bg-sidebar-accent/50">
        <h2 className={cn(
          "font-semibold transition-opacity duration-300 flex items-center gap-2 text-sidebar-foreground",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <Folder className="h-4 w-4 text-blue-500" />
          Файлы проекта
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0 hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className={cn(
        "h-[calc(100%-57px)] transition-opacity duration-300",
        isCollapsed ? "opacity-0" : "opacity-100"
      )}>
        <div className="p-4">
          <div className="space-y-1">
            <div 
              className="flex items-center gap-2 p-2 hover:bg-sidebar-accent rounded-md cursor-pointer text-sidebar-foreground"
              onClick={() => toggleFolder('src')}
            >
              {expandedFolders.includes('src') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Folder className="h-4 w-4 text-blue-500" />
              <span>src</span>
            </div>
            {expandedFolders.includes('src') && (
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2 p-2 hover:bg-sidebar-accent rounded-md cursor-pointer text-sidebar-foreground">
                  <Code className="h-4 w-4 text-yellow-500" />
                  <span>index.tsx</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-sidebar-accent rounded-md cursor-pointer text-sidebar-foreground">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>styles.css</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};