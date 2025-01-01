import { supabase } from '@/integrations/supabase/client'

export type AIModel = 'openai' | 'anthropic'

export const generateCode = async (prompt: string, model: AIModel = 'openai') => {
  const { data: { session } } = await supabase.auth.getSession()
  
  const response = await fetch(
    'https://tihzvdrwejnzeiaectey.supabase.co/functions/v1/generate-code',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ prompt, model }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to generate code')
  }

  return response.json()
}