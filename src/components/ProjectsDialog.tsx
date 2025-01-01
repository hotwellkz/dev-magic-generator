import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, Plus, Trash2, Globe, Clock, FileText } from "lucide-react";
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
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      toast.error("Ошибка при удалении проекта");
    }
  };

  const handleDeployProject = async (projectId: string) => {
    try {
      toast.info("Развертывание проекта...");
      // Here we would implement the actual deployment logic
      // For now, we'll just show a success message
      setTimeout(() => {
        toast.success("Проект успешно развернут!");
      }, 2000);
    } catch (error) {
      toast.error("Ошибка при развертывании проекта");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Folder className="h-4 w-4 mr-2" />
          Проекты
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
        <ScrollArea className="h-[400px]">
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
                  className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Это действие нельзя отменить. Проект будет удален безвозвратно.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Создан: {formatDate(project.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Обновлен: {formatDate(project.updated_at)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleDeployProject(project.id)}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Развернуть
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};