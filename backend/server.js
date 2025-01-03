import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

const upload = multer();

// OpenAI initialization
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Google Generative AI initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route for categorizing items as 'recycle' or 'compost'
app.post('/chat', async (req, res) => {
    try {
        const text = req.body.text;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an environmental expert. Categorize the following item given as input as either 'recycle' or 'compost' based on its material. Respond only with one of these two words: 'recycle' or 'compost'.",
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            temperature: 1,
            max_tokens: 2049,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.json({ reply: completion.choices[0]?.message?.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Route for identifying plants from an image
app.post('/identify', upload.single('image'), async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Convert buffer to base64
        const imageBase64 = req.file.buffer.toString('base64');

        const prompt =
            "Identify this plant and provide detailed information including: " +
            "common name, scientific name, description, family, native region, " +
            "growth habit, flower color, and leaf type. Format as JSON.";

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: req.file.mimetype,
                },
            },
        ]);

        const response = await result.response;

        // Get the response text
        const responseText = await response.text();
        console.log("API Response:", responseText);  // Log the response to see the content

        // Strip the "```json" and "```" from the response text
        const cleanResponseText = responseText.replace(/```json|```/g, '').trim();

        // Parse the cleaned response text as JSON
        const plantData = JSON.parse(cleanResponseText);

        res.json(plantData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to identify plant' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
