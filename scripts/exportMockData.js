const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'website', 'src', 'screens', 'admin', 'AdminDashboard.jsx');
const out = path.join(__dirname, 'mockdata.json');
const s = fs.readFileSync(src, 'utf8');
const marker = 'const mockData =';
const start = s.indexOf(marker);
if (start === -1) {
  console.error('mockData marker not found');
  process.exit(2);
}
const idxOpen = s.indexOf('{', start);
let i = idxOpen;
let depth = 0;
for (; i < s.length; i++) {
  const ch = s[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) break;
  }
}
if (i >= s.length) {
  console.error('Failed to find end of mockData');
  process.exit(3);
}
const objStr = s.slice(idxOpen, i + 1);
let data;
try {
  data = eval('(' + objStr + ')');
} catch (e) {
  console.error('Eval error:', e);
  process.exit(4);
}
fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log('Wrote', out);
