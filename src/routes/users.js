const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

const router = express.Router();

// SEEDED: SQL injection via template literal
router.get('/search', (req, res) => {
  const name = req.query.name;
  const rows = db.prepare(`SELECT id, name, email FROM users WHERE name LIKE '%${name}%'`).all();
  res.json(rows);
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  // SEEDED: weak JWT setup (hardcoded secret, no expiry)
  const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret);
  res.json({ token });
});

module.exports = router;
