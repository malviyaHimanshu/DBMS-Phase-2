const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var usersRouter = require('./routes/users');
// const connection = require('./connection');
const path = require("path");
const bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
// app.set('view', path.join(__dirname, "views"));
app.use('/assets', express.static('assets'));


app.use('/users', usersRouter);
app.use('/', require(path.join(__dirname, "/routes/users.js")));



app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
