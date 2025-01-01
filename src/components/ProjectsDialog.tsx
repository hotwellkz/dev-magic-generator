import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, Plus, Trash2 } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const ProjectsDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const { projects, isLoading, createProject } = useProjects();
  const queryClient = useQueryClient();

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast.error("Введите название проекта");
      return;
    }

    try {
      await createProject.mutateAsync(newProjectName);
      setNewProjectName("");
      toast.success("Проект создан");
    } catch (error) {
      toast.error("Ошибка при создании проекта");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
      
      toast.success("Проект удален");
      // Обновляем список проектов через react-query
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      toast.error("Ошибка при удалении проекта");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Название нового проекта"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Button onClick={handleCreateProject} disabled={createProject.isPending}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {isLoading ? (
              <div className="p-4 text-center">Загрузка...</div>
            ) : projects?.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Нет проектов
              </div>
            ) : (
              projects?.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Создан: {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};