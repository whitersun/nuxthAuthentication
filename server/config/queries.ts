// Context from Code Snippet d:\web\fullstack\nuxtAuthentication\server\database\createUsers.ts:
export const createUsers = `
CREATE SCHEMA IF NOT EXISTS public;
CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT as identity NOT NULL gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    avatar TEXT,
    gender TEXT,
    phone TEXT UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)`;