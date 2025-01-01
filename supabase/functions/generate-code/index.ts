import { serve } from 'https://deno.fresh.dev/server.ts'
import { OpenAI } from 'https://deno.land/x/openai/mod.ts'
import { Anthropic } from 'https://deno.land/x/anthropic/mod.ts'

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
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      })
      response = completion.choices[0].message.content
    } else if (model === 'anthropic') {
      const anthropic = new Anthropic(Deno.env.get('ANTHROPIC_API_KEY')!)
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: prompt }],
      })
      response = completion.content[0].text
    } else {
      throw new Error('Invalid model specified')
    }

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})