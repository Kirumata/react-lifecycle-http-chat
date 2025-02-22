// server.js
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const messages = [];

let nextId = 0;
let getRequestNumber = 1;

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(bodyParser.json());

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post("/messages", (req, res) => {
    messages.push({ ...req.body, id: nextId++ });
    console.log(messages[messages.length - 1]);
    res.status(204);
    res.end()
});

app.delete("/notes/:id", (req, res) => {
    /*const noteId = Number(req.params.id);
    const index = notes.findIndex((o) => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    res.status(204);
    res.end();*/
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});