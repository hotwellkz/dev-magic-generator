import { supabase } from '@/integrations/supabase/client'

export type AIModel = 'openai' | 'anthropic'

const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-domain.com/api' 
  : 'http://localhost:3000/api';

export const generateCode = async (prompt: string, model: AIModel = 'openai') => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    const response = await fetch(`${API_URL}/code/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ prompt, model }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to generate code')
    }

    const data = await response.json()
    return { response: data.result }
  } catch (error) {
    console.error('Error generating code:', error)
    throw error
  }
}