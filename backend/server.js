const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./shopping.db');

app.use(cors());
app.use(bodyParser.json());

db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    created_at TEXT
)`);

app.get('/items', (req, res) => {
    db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/items', (req, res) => {
    const { name, description, price } = req.body;
    const createdAt = new Date().toISOString();
    db.run(`INSERT INTO items (name, description, price, created_at) VALUES (?, ?, ?, ?)`,
        [name, description, price, createdAt],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, description, price, created_at: createdAt });
        });
});

app.delete('/items/:id', (req, res) => {
    db.run(`DELETE FROM items WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
