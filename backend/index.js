const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/temples', (req, res) => {
  const city = req.query.city;
  if (city) {
    const temples = db.prepare('SELECT * FROM temples WHERE city LIKE ? OR name LIKE ?').all(`%${city}%`, `%${city}%`);
    res.json(temples);
  } else {
    const temples = db.prepare('SELECT * FROM temples').all();
    res.json(temples);
  }
});

app.get('/api/plans', (req, res) => {
  const { terrain, budget } = req.query;
  let query = 'SELECT * FROM plans';
  const params = [];

  if (terrain || budget) {
    query += ' WHERE';
    if (terrain) {
      query += ' terrain = ?';
      params.push(terrain);
    }
    if (budget) {
      if (terrain) query += ' AND';
      query += ' budget = ?';
      params.push(budget);
    }
  }

  const plans = db.prepare(query).all(...params);
  // Parse tags back to array
  const formattedPlans = plans.map(p => ({ ...p, tags: p.tags.split(',') }));
  res.json(formattedPlans);
});

app.get('/api/blogs', (req, res) => {
  const blogs = db.prepare('SELECT * FROM blogs').all();
  res.json(blogs);
});

app.get('/api/bookings', (req, res) => {
  const bookings = db.prepare('SELECT * FROM bookings ORDER BY id DESC').all();
  const formattedBookings = bookings.map(b => ({
    ...b,
    user_details: JSON.parse(b.user_details)
  }));
  res.json(formattedBookings);
});

app.post('/api/blogs', (req, res) => {
  const { title, tag, description } = req.body;
  const author = 'You'; // Default for now
  const time = 'Just now';
  const color = '#8A2BE2'; // Default purple
  const likes = '0';

  const insert = db.prepare('INSERT INTO blogs (tag, title, author, time, color, likes, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const info = insert.run(tag, title, author, time, color, likes, description);
  res.status(201).json({ id: info.lastInsertRowid, status: 'Published' });
});

app.post('/api/bookings', (req, res) => {
  const { item_id, item_type, user_details } = req.body;
  const insert = db.prepare('INSERT INTO bookings (item_id, item_type, user_details) VALUES (?, ?, ?)');
  const info = insert.run(item_id, item_type, JSON.stringify(user_details));
  res.status(201).json({ id: info.lastInsertRowid, status: 'Confirmed' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
