import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, File } from "lucide-react";

export const FileManager = () => {
  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Файлы проекта</h2>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
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