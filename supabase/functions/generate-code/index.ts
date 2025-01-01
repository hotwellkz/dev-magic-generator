import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { OpenAI } from "https://deno.land/x/openai@v4.69.0/mod.ts"
import { Anthropic } from "https://deno.land/x/anthropic/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, model } = await req.json()

    if (!prompt) {
      throw new Error('No prompt provided')
    }

    let response

    if (model === 'openai') {
      const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY')!)
      const completion = await openai.createChatCompletion({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an AI assistant that helps generate code based on user prompts. Focus on writing clean, efficient, and well-documented code.' 
          },
          { role: 'user', content: prompt }
        ],
      })
      response = completion.choices[0].message.content
    } else if (model === 'anthropic') {
      const anthropic = new Anthropic(Deno.env.get('ANTHROPIC_API_KEY')!)
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        system: 'You are an AI assistant that helps generate code based on user prompts. Focus on writing clean, efficient, and well-documented code.',
        messages: [{ role: 'user', content: prompt }],
      })
      response = completion.content[0].text
    } else {
      throw new Error('Invalid model specified')
    }

    console.log(`Generated response using ${model} model:`, response)

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in generate-code function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})