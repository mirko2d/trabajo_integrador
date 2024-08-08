
const express = require('express');

const app = express();

const routes = require('./routes/routes.js'); 
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
  console.log('El servidor está funcionando en el puerto 3000'); 
});