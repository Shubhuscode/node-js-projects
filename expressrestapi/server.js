const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());


const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'members_db'
});


app.get('/api/members', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/api/members/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(results[0]);
  });
});


app.post('/api/members', (req, res) => {
  const { name, age, bs } = req.body;
  if (!name || !age || !bs) {
    return res.status(400).json({ error: 'All fields (name, age, bs) are required' });
  }
  db.query(
    'INSERT INTO members (name, age, bs) VALUES (?, ?, ?)',
    [name, age, bs],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, name, age, bs });
    }
  );
});


app.put('/api/members/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, bs } = req.body;
  db.query(
    'UPDATE members SET name = ?, age = ?, bs = ? WHERE id = ?',
    [name, age, bs, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Member not found' });
      res.json({ id, name, age, bs });
    }
  );
});


app.delete('/api/members/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Member not found' });
    res.status(204).send(); // No content
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
