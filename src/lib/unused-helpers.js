// SEEDED: dead code — this whole module is never required
function formatDueDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function isOverdue(task, now = new Date()) {
  return task.dueDate && new Date(task.dueDate) < now;
}

module.exports = { formatDueDate, isOverdue };
