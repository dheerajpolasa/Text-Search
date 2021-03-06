const express = require('express');

const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const expressPartials = require('express-partial');

const mongoose = require('mongoose');
const db = require('./config/mongoose');

const sassMiddleware = require('node-sass-middleware');

const app = express();
const PORT = 8080;

app.use(expressLayouts);
app.use(expressPartials());

// use express router
app.use(
  sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./assests'));

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log('Server is up and listening on', PORT);
});
