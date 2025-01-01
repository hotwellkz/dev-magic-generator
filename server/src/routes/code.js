import express from 'express';
import { logger } from '../utils/logger.js';

export const codeRoutes = express.Router();

codeRoutes.post('/generate', async (req, res, next) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Необходимо указать prompt' });
    }

    // Здесь будет логика генерации кода
    // Пока что просто логируем запрос
    logger.info('Получен запрос на генерацию кода', { prompt, model });

    res.json({ 
      message: 'Функционал генерации кода будет добавлен позже',
      prompt,
      model 
    });
  } catch (error) {
    next(error);
  }
});