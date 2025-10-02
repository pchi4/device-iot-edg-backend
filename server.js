const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = 'events_log.json';
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');

app.post('/api/events', (req, res) => {
  const ev = req.body;
  const arr = JSON.parse(fs.readFileSync(DB_FILE));
  arr.push({...ev, received_at: new Date().toISOString()});
  fs.writeFileSync(DB_FILE, JSON.stringify(arr, null, 2));
  console.log('Evento recebido:', ev);
  res.json({ok:true});
});

app.get('/api/events', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(DB_FILE)));
});

app.listen(3000, ()=>console.log('Server running on http://0.0.0.0:3000'));
