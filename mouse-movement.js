const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

app.get('/get', (req, res, next) => {
    let db = new sqlite3.Database(path.join(__dirname,'db/scores.db'));
    db.all("SELECT name, score FROM scores ORDER BY score ASC LIMIT 25", (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(row));
        }
        db.close();
    });
}); 

app.post('/set', (req, res, next) => {
    let db = new sqlite3.Database(path.join(__dirname, 'db/scores.db'));
    db.run(`INSERT INTO scores (name, score) VALUES ('${req.body.name}', ${req.body.score});`, [], (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('OK');
        }
        db.close();
    });
});

app.listen(3001);

