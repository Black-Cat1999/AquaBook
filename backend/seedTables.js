// seedTables.js — Run this ONCE to pre-fill tables into MongoDB
// Usage: node seedTables.js

const mongoose = require('mongoose');
require('dotenv').config();
const Table = require('./models/Table');

const tables = [
  {
    name: 'Table 1 — Championship',
    type: '8ball',
    description: 'Full-size 8-Ball pool table with Simonis 860 cloth. Perfect for competitive matches and casual play alike.',
    pricePerHour: 300,
    isActive: true
  },
  {
    name: 'Table 2 — Snooker Pro',
    type: 'snooker',
    description: 'Regulation 12-foot snooker table used in professional tournaments. Precision leveled and re-clothed monthly.',
    pricePerHour: 500,
    isActive: true
  },
  {
    name: 'Table 3 — VIP Suite',
    type: 'vip',
    description: 'Private VIP room with a premium pool table, lounge seating, ambient lighting, and dedicated service. Book for groups.',
    pricePerHour: 800,
    isActive: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing tables before seeding
    await Table.deleteMany({});
    console.log('Old tables cleared');

    // Insert new tables
    const inserted = await Table.insertMany(tables);
    console.log(`✅ ${inserted.length} tables seeded successfully:`);
    inserted.forEach(t => console.log(`  - ${t.name} (${t.type}) — ₹${t.pricePerHour}/hr`));

  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB Disconnected');
  }
}

seed();
