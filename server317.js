var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

var StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'db'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server...\n');
});

connection.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255))", function(err) {
  if (err) {
    console.error('error: ' + err.message);
  } else {
    // Reset the AUTO_INCREMENT value to 1
    connection.query("ALTER TABLE users AUTO_INCREMENT = 1", function(err) {
      if (err) {
        console.error('error: ' + err.message);
      }
    });
  }
});

app.post('/register', express.json(), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the email and password already exist in the database
  connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], async (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.length > 0) {
          return res.status(409).json({ error: 'Email and password combination already exists' });
      }

      try {
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert user into the database
          connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err, result) => {
              if (err) {
                  return res.status(500).json({ error: 'Internal server error' });
              }

              res.status(200).json({ message: 'Registration successful' });
          });
      } catch (error) {
          console.error('Error during registration:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
});

app.post('/login', express.json(), async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    // Check if user exists in the database
    connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      try {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, result[0].password);
  
        if (passwordMatch) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

console.log(message);
