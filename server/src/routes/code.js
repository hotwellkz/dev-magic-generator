import express from 'express';
import { logger } from '../utils/logger.js';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

export const codeRoutes = express.Router();

// Инициализация клиентов AI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

codeRoutes.post('/generate', async (req, res, next) => {
  try {
    const { prompt, model = 'openai' } = req.body;

    if (!prompt) {
      logger.error('Отсутствует prompt в запросе');
      return res.status(400).json({ error: 'Необходимо указать prompt' });
    }

    let result;
    
    if (model === 'openai') {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates code based on user prompts."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });
      
      result = completion.choices[0].message.content;
    } else if (model === 'anthropic') {
      const message = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1500,
        messages: [{
          role: "user",
          content: prompt
        }],
        temperature: 0.7
      });
      
      result = message.content[0].text;
    } else {
      logger.error(`Неподдерживаемая модель: ${model}`);
      return res.status(400).json({ error: 'Неподдерживаемая модель' });
    }

    logger.info('Код успешно сгенерирован', { model });
    
    res.json({ 
      result,
      model 
    });
  } catch (error) {
    logger.error('Ошибка при генерации кода:', error);
    next(error);
  }
});