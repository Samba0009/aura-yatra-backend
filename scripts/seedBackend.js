const fs = require('fs');
const path = require('path');
const fetch = globalThis.fetch || require('node-fetch');
(async () => {
  try {
    const file = path.join(__dirname, 'mockdata.json');
    const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
    const res = await fetch('http://localhost:5000/api/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const text = await res.text();
    fs.writeFileSync(path.join(__dirname, 'seed_response.json'), text);
    console.log('Seed response status', res.status);
    console.log(text.slice(0, 200));
  } catch (e) {
    console.error('Seed error', e.message || e);
    process.exit(1);
  }
})();
