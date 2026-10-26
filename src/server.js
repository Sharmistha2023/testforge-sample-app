const express = require('express');
const path = require('path');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');
const adminRouter = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/api/files', filesRouter);
app.use('/api/admin', adminRouter);

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Task Tracker listening on ${port}`));
}

module.exports = app;
