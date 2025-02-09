const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task manegment", 
});
db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the MySQL database");
    }
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Fill all fields" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      const user = results[0];

      res.status(200).json({ 
        message: "Login successful", 
        id: user.id,
        role: user.role 
      });

    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

  
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Fill all fields" });
  }

  const sql = "INSERT INTO users(username, email, PASSWORD) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, results) => {
    if (err) {
      console.error("Database error: " + err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows > 0) {
      return res.status(201).json({ message: "Registered successfully!" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  });
});
app.get("/tasks/:id", (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  db.query("SELECT * FROM tasks WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    res.json(results);
  });
});

app.patch("/tasks/:id", (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  db.query( "UPDATE tasks SET status = 'completed' WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



app.get("/login/admin", (req, res) => {
  const sql = "SELECT id, username, email, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});
app.post("/login/admin", (req, res) => {
  const { id, task, title } = req.body;
  

  const sql = "INSERT INTO tasks(user_id, description, title) VALUES(?, ?, ?)";
  
  db.query(sql, [id, task, title], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
   
    res.json({
      message: "Task added successfully!",
      task: { id, task, title },
      result: results
    });
  });
});
app.post("/admintasks", (req, res) => {
  console.log("Request received at /admintasks endpoint."); 
  const { id } = req.body;
  console.log("Received ID:", id); 

  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      console.log("No tasks found for this user.");
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    console.log("Tasks found:", results);  
    res.json(results);  
  });
});






