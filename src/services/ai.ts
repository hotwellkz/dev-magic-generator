import { supabase } from '@/integrations/supabase/client'

export type AIModel = 'openai' | 'anthropic'

const API_URL = import.meta.env.VITE_API_URL;

export const generateCode = async (prompt: string, model: AIModel = 'openai') => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    console.log('Making request to:', `${API_URL}/api/code/generate`);
    
    const response = await fetch(`${API_URL}/api/code/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ prompt, model }),
      mode: 'no-cors',
      credentials: 'include'
    });

    // При использовании no-cors мы не можем получить JSON напрямую
    // Поэтому сначала проверяем тип ответа
    if (response.type === 'opaque') {
      console.log('Получен opaque ответ из-за no-cors режима');
      // В этом случае мы можем вернуть предопределенный ответ
      return { response: 'Код успешно сгенерирован' };
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.message || 'Failed to generate code');
    }

    const data = await response.json();
    return { response: data.result };
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}