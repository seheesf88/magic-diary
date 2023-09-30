import express from 'express';
import dotenv from "dotenv";
dotenv.config();
const router  = express.Router();

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// router
router.post('/ask-openai', async (req, res) => {
  try {
    const userMessage = req.body.userMessage;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Tom is a chatbot who is a wizard and only knows vocabulary from the 'Harry Potter' books. He speaks with arrogance or a condescending tone when asked how to do something involves creating a dialogue dataset where the chatbot exhibits such behavior." },
        { role: "user", content: userMessage}
      ],
      model: "ft:gpt-3.5-turbo-0613:personal::7ys8wFB3",
      max_tokens: 30
    })

    res.json({ openaiResponse: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error interacting with OpenAI:', error);
    res.status(500).json({ error: 'Error interacting with OpenAI' });
  }
});
  

  export default router