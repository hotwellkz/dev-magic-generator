import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  name: string;
  prompt?: string;
  generated_code?: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const generateCode = async (prompt: string, model: 'openai' | 'anthropic' = 'openai'): Promise<string> => {
  try {
    const response = await fetch('/api/code/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при генерации кода');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

export const saveProject = async (name: string, prompt: string, generatedCode: string): Promise<Project> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          prompt,
          generated_code: generatedCode,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};