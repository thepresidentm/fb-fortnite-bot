const fortnite = require('./fortnite');
var cron = require('node-cron');

cron.schedule('10 18 * * *', () =>  {
    let date = new Date();
    console.log(date.getMinutes());
    fortnite.execute();
}, {
    scheduled: true,
    timezone: "America/Mexico_City"
});