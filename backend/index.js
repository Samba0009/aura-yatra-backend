const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/temples', async (req, res) => {
  try {
    const city = req.query.city;
    let result;
    if (city) {
      result = await db.query(
        'SELECT * FROM temples WHERE city ILIKE $1 OR name ILIKE $2',
        [`%${city}%`, `%${city}%`]
      );
    } else {
      result = await db.query('SELECT * FROM temples');
    }
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/plans', async (req, res) => {
  try {
    const { terrain, budget } = req.query;
    let query = 'SELECT * FROM plans';
    const params = [];
    let paramCount = 1;

    if (terrain || budget) {
      query += ' WHERE';
      if (terrain) {
        query += ` terrain = $${paramCount}`;
        params.push(terrain);
        paramCount++;
      }
      if (budget) {
        if (terrain) query += ' AND';
        query += ` budget = $${paramCount}`;
        params.push(budget);
      }
    }

    const result = await db.query(query, params);
    // Parse tags back to array
    const formattedPlans = result.rows.map(p => ({ ...p, tags: p.tags.split(',') }));
    res.json(formattedPlans);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM blogs');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bookings ORDER BY id DESC');
    const formattedBookings = result.rows.map(b => ({
      ...b,
      user_details: JSON.parse(b.user_details)
    }));
    res.json(formattedBookings);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const { title, tag, description } = req.body;
    const author = 'You';
    const time = 'Just now';
    const color = '#8A2BE2';
    const likes = '0';

    const result = await db.query(
      'INSERT INTO blogs (tag, title, author, time, color, likes, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [tag, title, author, time, color, likes, description]
    );
    res.status(201).json({ id: result.rows[0].id, status: 'Published' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { item_id, item_type, user_details } = req.body;
    const result = await db.query(
      'INSERT INTO bookings (item_id, item_type, user_details) VALUES ($1, $2, $3) RETURNING id',
      [item_id, item_type, JSON.stringify(user_details)]
    );
    res.status(201).json({ id: result.rows[0].id, status: 'Confirmed' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server after verifying DB connectivity (retry if needed)
async function startServer() {
  const maxTries = 6;
  const delayMs = 3000;
  let attempt = 0;

  while (attempt < maxTries) {
    try {
      attempt++;
      console.log(`DB connection test attempt ${attempt}...`);
      // For pg Pool this will attempt a simple query
      await db.query('SELECT 1');
      console.log('Database connection OK. Starting server.');
      app.listen(PORT, () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
      });
      return;
    } catch (err) {
      console.error(`DB connect attempt ${attempt} failed:`, err.message || err);
      if (attempt >= maxTries) {
        console.error('Exceeded max DB connect attempts. Exiting.');
        process.exit(1);
      }
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

startServer();
