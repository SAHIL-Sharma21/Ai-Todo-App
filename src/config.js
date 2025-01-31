import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvConfig(){
    const localEnvPath = path.join(process.cwd(), '.env');

    if(fs.existsSync(localEnvPath)){
        dotenv.config({
            path: localEnvPath
        });
    }


    if(!process.env.GOOGLE_API_KEY){
        console.error('\nError: Missing Gemini API key');
        console.error('\nPlease create a .env file in your current directory with:');
        console.error('GOOGLE_API_KEY=your_gemini_api_key_here');
        console.error('\nOr set it as an environment variable:');
        console.error('export GOOGLE_API_KEY=your_gemini_api_key_here\n');
        process.exit(1);
    }


    return {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
    }
}

export const config = loadEnvConfig();