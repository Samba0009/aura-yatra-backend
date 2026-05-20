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

// Admin CRUD endpoints
app.post('/api/temples', async (req, res) => {
  try {
    const { name, location, city, icon, price, description } = req.body;
    const result = await db.query(
      'INSERT INTO temples (name, location, city, icon, price, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, location, city, icon, price, description]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/temples/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, city, icon, price, description } = req.body;
    await db.query(
      'UPDATE temples SET name=$1, location=$2, city=$3, icon=$4, price=$5, description=$6 WHERE id=$7',
      [name, location, city, icon, price, description, id]
    );
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/temples/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM temples WHERE id=$1', [id]);
    res.json({ status: 'deleted' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/plans', async (req, res) => {
  try {
    const { name, description, terrain, budget, tags = [], image_url } = req.body;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    const result = await db.query(
      'INSERT INTO plans (name, description, terrain, budget, tags, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, description, terrain, budget, tagsStr, image_url]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, terrain, budget, tags = [], image_url } = req.body;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    await db.query(
      'UPDATE plans SET name=$1, description=$2, terrain=$3, budget=$4, tags=$5, image_url=$6 WHERE id=$7',
      [name, description, terrain, budget, tagsStr, image_url, id]
    );
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM plans WHERE id=$1', [id]);
    res.json({ status: 'deleted' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, title, author, time, color, likes, description } = req.body;
    await db.query(
      'UPDATE blogs SET tag=$1, title=$2, author=$3, time=$4, color=$5, likes=$6, description=$7 WHERE id=$8',
      [tag, title, author, time, color, likes, description, id]
    );
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM blogs WHERE id=$1', [id]);
    res.json({ status: 'deleted' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { item_id, item_type, user_details } = req.body;
    await db.query(
      'UPDATE bookings SET item_id=$1, item_type=$2, user_details=$3 WHERE id=$4',
      [item_id, item_type, JSON.stringify(user_details), id]
    );
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM bookings WHERE id=$1', [id]);
    res.json({ status: 'deleted' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Seed endpoint: accepts JSON with arrays for temples, plans, blogs, bookings
app.post('/api/seed', async (req, res) => {
  try {
    const payload = req.body || {};
    // Insert temples
    if (Array.isArray(payload.temples)) {
      for (const t of payload.temples) {
        await db.query('INSERT INTO temples (name, location, city, icon, price, description) VALUES ($1,$2,$3,$4,$5,$6)', [t.name, t.location || '', t.city || '', t.icon || '', t.price || 0, t.description || '']);
      }
    }
    // Insert plans
    if (Array.isArray(payload.plans)) {
      for (const p of payload.plans) {
        const tags = Array.isArray(p.tags) ? p.tags.join(',') : (p.tags || '');
        await db.query('INSERT INTO plans (name, description, terrain, budget, tags, image_url) VALUES ($1,$2,$3,$4,$5,$6)', [p.name, p.description || '', p.terrain || '', p.budget || '', tags, p.image_url || '']);
      }
    }
    // Insert blogs
    if (Array.isArray(payload.blogs)) {
      for (const b of payload.blogs) {
        await db.query('INSERT INTO blogs (tag, title, author, time, color, likes, description) VALUES ($1,$2,$3,$4,$5,$6,$7)', [b.tag || '', b.title || '', b.author || 'Admin', b.time || '', b.color || '#8A2BE2', b.likes || '0', b.content || b.description || '']);
      }
    }
    // Insert bookings
    if (Array.isArray(payload.bookings)) {
      for (const bk of payload.bookings) {
        await db.query('INSERT INTO bookings (item_id, item_type, user_details) VALUES ($1,$2,$3)', [bk.item_id || 0, bk.item_type || 'temple', JSON.stringify(bk.user_details || {})]);
      }
    }

    res.json({ status: 'seeded' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: 'Seed failed' });
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
