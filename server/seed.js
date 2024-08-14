import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DBCONECTION });

db.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(15) NOT NULL
    )
    
    INSERT INTO users(name, password) VALUES('Admin', 'PassWord123!')
    
    CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    colour VARCHAR(12)
    )
    
    INSERT INTO categories(name, colour)VALUES('Codeing', '#dba554')

    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    likes INT,
    timestamp timestamp default now() NOT NULL,
    category_id INTEGER REFERENCES categories(id)
    )
    
    INSERT INTO messages (user_id, message, likes, timestamp, category_id) VALUES('1', 'test', 1,'now()','1')
    
    `);
