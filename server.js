const express = require('express');

const { knex } = require('./src/utils/db');

const app = express();
app.enable('trust proxy');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)  =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Max-Age', 86400);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

require('./src/routes')(app);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
