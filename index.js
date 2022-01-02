const fortnite = require('./fortnite');
var cron = require('node-cron');

cron.schedule('* * * * *', () =>  {
    let date = new Date();
    console.log(date.getMinutes());
    fortnite.execute();
});