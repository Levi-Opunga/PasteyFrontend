import * as dotenv from 'dotenv';
dotenv.config();


export const environment = {
    BASE_URL: process.env.BACKEND_URL,
    API_KEY: process.env.API_KEY,
}