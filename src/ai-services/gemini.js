import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';
import { SYSTEM_PROMPT } from '../systemPrompt.js';


dotenv.config({
    path: '.env'
});

const googleClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
export const model = googleClient.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: {
        role: 'system',
        parts: [{text: SYSTEM_PROMPT}]
    },
    generationConfig: {
        responseMimeType: "application/json"
    }
});