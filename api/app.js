var express = require('express');
var app = express();
var port = 8080;


var recipes = require('./controllers/recipes.js');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.use('/recipes', recipes);

app.all(/.*/, function(req, res) {
    res.send('Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

