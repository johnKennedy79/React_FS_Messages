import express, { query, response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const db = new pg.Pool({ connectionString: process.env.DBCONECTION });

//server home page connection test
app.get("/", (req, res) => {
  res.send("server root and that's the troot");
});

//Call all message history to the message board
app.get("/messages", async function (req, res) {
  const data =
    await db.query(`SELECT messages.id, messages.message, messages.likes, messages.timestamp, users.name AS user, categories.name AS category, categories.colour AS colour 
    FROM messages
    JOIN users ON messages.user_id = users.id
    JOIN categories ON messages.category_id = categories.id
    ORDER BY messages.timestamp DESC`);
  res.json(data.rows);
});

// get single user data to connect to new messages
app.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query(
      "SELECT users.id, user,name FROM users WHERE users.name = $1",
      [username]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//post request to add a new message
app.post("/messages", async function (req, res) {
  const name = req.body.name;
  const message = req.body.message;
  const timestamp = req.body.timestamp;
  const category = req.body.category;
  const responce = await db.query(
    `INSERT INTO messages (user_id, message, timestamp, category_id) VALUES ($1,$2,$3,$4)`,
    [name, message, timestamp, category]
  );
  if (responce.rowCount == 1) {
    res.status(200).json({ message: "message success" });
  } else res.status(500).json({ message: "message failed" });
});

// fetch point for categories table
app.get("/categories", async function (req, res) {
  const catData = await db.query(`SELECT * FROM categories`);
  res.json(catData.rows);
});

// post request to add new categories
app.post("/categories", async function (req, res) {
  const name = req.body.name;
  const colour = req.body.colour;
  const responce = await db.query(
    `INSERT INTO categories(name, colour) VALUES($1,$2)`,
    [name, colour]
  );
  if (responce.rowCount == 1) {
    res.status(200).json({ message: "message success" });
  } else res.status(500).json({ message: "message failed" });
});

// fetch route for users table
app.get("/users", async function (req, res) {
  const userdata = await db.query(`SELECT * FROM users`);
  res.json(userdata.rows);
});

//post new signup form
app.post("/signUp", async function (req, res) {
  const name = req.body.name;
  const password = req.body.password;
  const responce = await db.query(
    `INSERT INTO users (name, password) VALUES($1,$2)`,
    [name, password]
  );
  if (responce.rowCount == 1) {
    res.status(200).json({ message: "message success" });
  } else res.status(500).json({ message: "message failed" });
});

//Login verifcation post request and compaire
app.post("/login", async function (req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const result = await db.query(`SELECT * FROM users WHERE name = $1`, [
      name,
    ]);
    const user = result.rows[0];
    console.log(user);
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

//port listening
app.listen("8080", () => {
  console.log("listening to port 8080");
});
