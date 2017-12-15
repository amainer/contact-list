const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')

const jsonParser = bodyParser.json();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
