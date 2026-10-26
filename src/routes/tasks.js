const express = require('express');
const db = require('../db');
const { completionRate, averageEstimate } = require('../lib/stats');

const router = express.Router();

// SEEDED: SQL injection — status comes straight from the query string
router.get('/', (req, res) => {
  const status = req.query.status;
  const rows = db.prepare("SELECT * FROM tasks WHERE status = '" + status + "'").all();
  res.json(rows);
});

// SEEDED: N+1 query — one comments query per task inside a loop
router.get('/with-comments', async (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  for (const task of tasks) {
    task.comments = await db.prepare('SELECT * FROM comments WHERE task_id = ?').all(task.id);
  }
  res.json(tasks);
});

router.get('/stats', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  const done = tasks.filter((t) => t.status === 'done').length;
  res.json({
    completion: completionRate(done, tasks.length),
    averageEstimate: averageEstimate(tasks.map((t) => t.estimate)),
  });
});

router.post('/', (req, res) => {
  const { title, ownerId, estimate } = req.body;
  // SEEDED: no input validation; parseInt without radix
  const info = db
    .prepare('INSERT INTO tasks (title, status, owner_id, estimate) VALUES (?, ?, ?, ?)')
    .run(title, 'open', ownerId, parseInt(estimate));
  res.status(201).json({ id: info.lastInsertRowid });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
