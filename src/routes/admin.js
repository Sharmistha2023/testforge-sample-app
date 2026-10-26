const express = require('express');
const { exec } = require('child_process');
const _ = require('lodash');

const router = express.Router();

// SEEDED: command injection — host comes straight from the query string
router.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });
    res.type('text').send(stdout);
  });
});

// SEEDED: prototype pollution via lodash.merge on user input (lodash 4.17.15)
const settings = {};
router.post('/settings', (req, res) => {
  _.merge(settings, req.body);
  res.json(settings);
});

// SEEDED: eval of user input
router.post('/calc', (req, res) => {
  const result = eval(req.body.expression);
  res.json({ result });
});

module.exports = router;
