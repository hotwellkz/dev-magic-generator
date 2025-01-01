import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder } from "lucide-react";

export const ProjectsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Folder className="h-4 w-4 mr-2" />
          Проекты
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>История проектов</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] mt-4">
          <div className="space-y-4">
            {/* TODO: Здесь будет список проектов из Supabase */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Проект #1</h3>
              <p className="text-sm text-muted-foreground">Создан: 01.01.2024</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};