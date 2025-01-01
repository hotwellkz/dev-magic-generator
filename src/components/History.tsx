import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getProjects, deleteProject, type Project } from '@/services/api';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';

export const History = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Не удалось загрузить проекты");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Проект успешно удален");
      fetchProjects();
    } catch (error) {
      toast.error("Не удалось удалить проект");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">История проектов</h2>
      <ScrollArea className="h-[300px]">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md group">
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatDistance(new Date(project.created_at), new Date(), {
                  addSuffix: true,
                  locale: ru
                })}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDelete(project.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};