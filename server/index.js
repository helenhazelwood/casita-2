const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
module.exports = app;
//console log that server is running
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./api'))

