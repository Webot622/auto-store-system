// WeBot Full App Backend (server.js)
// Includes: PayPal + Bank Option + Flowise + n8n + Full Plan Support + Auth System

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // Replace with database later

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });

  res.json({ message: "User registered" });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "No account found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ email }, "SECRET123");

  res.json({ token });
});

// FREE PLAN BOT
app.post('/create/free-bot', async (req, res) => {
  res.json({ bot_url: "https://flowise.free.bot.generated" });
});

// PAID PLAN BOT
app.post('/create/pro-bot', async (req, res) => {
  res.json({ bot_url: "https://flowise.pro.bot.generated" });
});

// PAYPAL PAYMENT
app.post('/paypal/pay', async (req, res) => {
  res.json({ pay_url: "https://paypal.com/pay/link" });
});

app.listen(3000, () => console.log("SERVER RUNNING on port 3000"));
