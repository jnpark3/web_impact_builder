const express = require('express');
const Router = require("./backend/router")

const bodyParser = require('body-parser');

const app = express();
const port = 3080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

app.use("/api", Router);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});