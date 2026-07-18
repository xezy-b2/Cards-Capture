require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { connectDB } = require('../src/config/db');

const authRoutes = require('./routes/auth');
const collectionRoutes = require('./routes/collection');
const tradeRoutes = require('./routes/trades');
const deckRoutes = require('./routes/deck');
const battleRoutes = require('./routes/battle');
const boosterRoutes = require('./routes/booster');

const app = express();
const PORT = process.env.WEB_PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-moi',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 jours
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/api', collectionRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/deck', deckRoutes);
app.use('/api/battle', battleRoutes);
app.use('/api/booster', boosterRoutes);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🌐 Site PokeBot disponible sur http://localhost:${PORT}`);
  });
}

start();
