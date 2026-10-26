// SEEDED: division by zero when total is 0 (returns NaN)
function completionRate(done, total) {
  return Math.round((done / total) * 100);
}

// SEEDED: empty array -> NaN; null estimates are not filtered
function averageEstimate(estimates) {
  const sum = estimates.reduce((a, b) => a + b, 0);
  return sum / estimates.length;
}

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// SEEDED: dead code — never imported anywhere
function legacyPriorityScore(task) {
  if (task.priority === 'high') return 3;
  if (task.priority === 'medium') return 2;
  return 1;
}

module.exports = { completionRate, averageEstimate, slugify, legacyPriorityScore };
