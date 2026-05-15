const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'aurayatra.db'));

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS temples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    city TEXT,
    icon TEXT,
    price INTEGER,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    location TEXT,
    duration TEXT,
    price INTEGER,
    terrain TEXT,
    budget TEXT,
    image TEXT,
    tags TEXT
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT,
    title TEXT,
    author TEXT,
    time TEXT,
    color TEXT,
    likes TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    item_type TEXT,
    user_details TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data helper
const seedData = () => {
  const templeCount = db.prepare('SELECT count(*) as count FROM temples').get().count;
  if (templeCount === 0) {
    const insertTemple = db.prepare('INSERT INTO temples (name, location, city, icon, price, description) VALUES (?, ?, ?, ?, ?, ?)');
    insertTemple.run('Sri Venkateswara Temple', 'Tirumala Hills, Andhra Pradesh', 'Tirupati', '🛕', 300, 'One of the most visited holy shrines in the world.');
    insertTemple.run('Padmavathi Ammavari Temple', 'Tiruchanur, Tirupati', 'Tirupati', '🌺', 100, 'Dedicated to Goddess Padmavathi.');
    insertTemple.run('Kashi Vishwanath Temple', 'Varanasi, Uttar Pradesh', 'Varanasi', '🕉️', 500, 'Dedicated to Lord Shiva.');
    insertTemple.run('Meenakshi Amman Temple', 'Madurai, Tamil Nadu', 'Madurai', '🏛️', 200, 'Historic Hindu temple.');
  }

  const planCount = db.prepare('SELECT count(*) as count FROM plans').get().count;
  if (planCount === 0) {
    const insertPlan = db.prepare('INSERT INTO plans (title, location, duration, price, terrain, budget, image, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    insertPlan.run('Spiritual South India', 'Coorg, Karnataka', '5 Nights, 6 Days', 54000, 'Hill Stations', '₹50k+ Luxury', '🏔️', 'Luxury,Peaceful');
    insertPlan.run('Himalayan Retreat', 'Rishikesh, Uttarakhand', '3 Nights, 4 Days', 15000, 'Hill Stations', '₹15k Mid-range', '🏔️', 'Yoga,Adventure');
  }

  const blogCount = db.prepare('SELECT count(*) as count FROM blogs').get().count;
  if (blogCount === 0) {
    const insertBlog = db.prepare('INSERT INTO blogs (tag, title, author, time, color, likes, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
    insertBlog.run('Pilgrimage', '12 sacred temples of South India', 'Anita Rao', '5 min read', '#5dcaa5', '1.2k', 'A comprehensive guide to South Indian temples.');
    insertBlog.run('Char Dham', 'Best time to visit Kedarnath', 'Rahul M', '3 min read', '#85b7eb', '850', 'Planning your trip to Kedarnath.');
    insertBlog.run('Festivals', 'Kumbh Mela — a beginner\'s guide', 'Vikram S', '7 min read', '#ef9f27', '2.5k', 'Navigating the world\'s largest spiritual gathering.');
  }
};

seedData();

module.exports = db;
