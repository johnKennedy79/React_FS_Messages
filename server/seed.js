import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DBCONECTION });

db.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(15) NOT NULL
    )
    
    
    
    CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )
    
    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    likes INT,
    timestamp timestamp default now() NOT NULL,
    category_id INTEGER REFERENCES categories(id)
    )
    
    CREATE TABLE IF NOT EXISTS message_categories (
    message_id INTEGER REFERENCES messages(id),
    category_id INTEGER REFERENCES categories(id)
    )
    
    CREATE TABLE IF NOT EXISTS user_messages (
    user_id INTEGER REFERENCES users(id),
    message_id INTEGER REFERENCES messages(id)
    )`);
