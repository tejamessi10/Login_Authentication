const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 0;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Users_authentication',
  password: 'Rtyfghcvb$$10',
  port: 5432,
});

app.post('/register', (req, res) => {
  const sql = `INSERT INTO "user_details" ("username", "email", "password") VALUES ($1, $2, $3)`;
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error for hashing password' });
    const values = [req.body.name, req.body.email, hash];
    pool.query(sql, values, (err, result) => {
      if (err)
        return res.json({
          Error: 'Inserting data error in server',
        });
      return res.json({
        Status: 'success',
      });
    });
  });
});

app.post('/login', async (req, res) => {
  const sql = 'SELECT * FROM user_details WHERE email = $1';
  pool.query(sql, [req.body.email], async (err, data) => {
    console.log(data.rows[0].password, data.rows.length);
    if (err) {
      console.error('Login error in server:', err);
      return res.status(500).json({ error: 'An error occurred during login' });
    }
    if (data.rows?.length > 0) {
      bcrypt.compare(
        req.body?.password,
        data.rows[0].password?.toString(),
        (err, response) => {
          if (err) {
            console.log("what's the err?", err);
            return res.json({ Error: err });
          }
          if (response) {
            console.log(data);
            const name = data.rows[0].username;
            const token = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            });
            console.log(token);
            return res.json({ Status: 'success', token: token });
          } else {
            return res.json({ Error: 'Incorrect password' });
          }
        }
      );
    } else {
      return res.json({ Error: 'email not found' });
    }
  });
});
app.get('/logout', async (req, res) => {
  res.json({ Status: 'success' });
});
app.listen(8081, () => {
  console.log('Server running on port 8081');
});
