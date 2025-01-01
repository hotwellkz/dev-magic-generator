import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProjects } from "@/hooks/use-projects";
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export const History = () => {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return <div className="text-center p-4">Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">История проектов</h2>
      <ScrollArea className="h-[300px]">
        {projects?.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-500">
                {formatDistance(new Date(project.created_at), new Date(), {
                  addSuffix: true,
                  locale: ru
                })}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Открыть
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};