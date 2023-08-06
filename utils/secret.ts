import dotenv from 'dotenv';

dotenv.config();

export const {
    SUPABASE_CLIENT_URL,
    SUPABASE_PROJECT_ID,
    SUPABASE_PASSWORD ,
    SUPABASE_DATABASE,
    SUPABASE_KEY
} = process.env;

const requiredCredentials = [
    'SUPABASE_CLIENT_URL',
    'SUPABASE_PROJECT_ID',
    'SUPABASE_PASSWORD',
    'SUPABASE_DATABASE',
    'SUPABASE_KEY'
];

for (const credential of requiredCredentials) {
    if (!process.env[credential]) {
        throw new Error(`Missing required environment variable: ${credential}`);
    }
}