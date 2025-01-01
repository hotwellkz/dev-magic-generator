import { supabase } from "@/integrations/supabase/client";

export interface GenerateCodeResponse {
  result: string;
  model: string;
  timestamp: string;
}

export const generateCode = async (prompt: string, model: 'openai' | 'anthropic' = 'openai'): Promise<GenerateCodeResponse> => {
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

    return await response.json();
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

export const createProject = async (name: string, code: string) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, description: code }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};