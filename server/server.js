import express, { query, response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const db = new pg.Pool({ connectionString: process.env.DBCONECTION });

app.get("/", (req, res) => {
  res.send("server root and that's the troot");
});

app.get("/messages", async function (req, res) {
  const data =
    await db.query(`SELECT messages.id, messages.message, messages.likes, messages.timestamp, users.name AS user, categories.name AS category, categories.colour AS colour 
    FROM messages
    JOIN users ON messages.user_id = users.id
    JOIN categories ON messages.category_id = categories.id`);
  res.json(data.rows);
  console.log(data.rows);
});

app.get("/users", async function (req, res) {
  const userdata = await db.query(`SELECT * FROM users`);
  res.json(userdata.rows);
});

app.get("/categories", async function (req, res) {
  const catData = await db.query(`SELECT * FROM categories`);
  res.json(catData.rows);
});

app.post("/login", async function (req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const result = await db.query(`SELECT*FROM users WHERE name = $1`, [name]);
    const user = result.rows[0];
    if (user && user.password === password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "server error" });
  }
});

app.listen("8080", () => {
  console.log("listening to port 8080");
});
