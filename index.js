const express = require('express');
const fortnite = require('./fortnite');
var cron = require('node-cron');

// Logic

cron.schedule('* * * * *', () =>  {
    let date = new Date();
    console.log(date.getMinutes());
    fortnite.execute();
}, {
    scheduled: true,
    timezone: "America/Mexico_City"
});

// Web

const app = express();
const port = process.env.PORT || "5000";
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo</h1>");
});