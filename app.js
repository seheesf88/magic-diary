import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
// import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({ origin: 'http://localhost:8080' }));
// create style tone
// await openai.files.create({
//   file: fs.createReadStream("style-and-tone.jsonl"),
//   purpose: "fine-tune",
// })

// const files = await openai.files.list()
// console.log(files)

// train it to openai
// const fineTune = await openai.fineTunes
//   .create({
//     training_file: "file-fwwFYDpfmXEWgEp1fWkKyP4a",
//     model: "gpt-3.5-turbo-0631",
//   })
//   .catch((err) => {
//     if(err instanceof OpenAI.APIError) {
//       console.error(err);
//     } else {
//       throw err;
//     }
//   })
// console.log("fineTune", fineTune)

// router
app.post('/ask-openai', async (req, res) => {
  try {
    console.log('userMessage', req.body)
    const userMessage = req.body.userMessage;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userMessage}],
      model: "ft:gpt-3.5-turbo-0613:personal::7usIXAyY"
    })

    res.json({ openaiResponse: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error interacting with OpenAI:', error);
    res.status(500).json({ error: 'Error interacting with OpenAI' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const requestData = {
//   training_file: "file-fwwFYDpfmXEWgEp1fWkKyP4a",
//   model: "gpt-3.5-turbo-0613"
// }

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
// }

// fetch("https://api.openai.com/v1/fine_tuning/jobs", {
//   method: "POST", 
//   headers: headers,
//   body: JSON.stringify(requestData)
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error("Error:", error)
//   })

// const completion = await openai.chat.completions.create({
//   messages: [{ role: "user", content: "Who wrote 'Romeo and Juliet'?"}],
//   model: "ft:gpt-3.5-turbo-0613:personal::7usIXAyY"
// })

