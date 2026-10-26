const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

// SEEDED: path traversal — req.params.name is joined without normalisation checks
router.get('/:name', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.name);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: err.message });
    res.send(data);
  });
});

module.exports = router;
