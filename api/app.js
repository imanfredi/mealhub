var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

/*Router imports*/

var ingredientsRouter = require("./routes/ingredients");
var recipesRouter = require("./routes/recipes");

var app = express();

var corsOptions = {
  exposedHeaders: ["Link"],
};

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/* Router middlewares */

app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);

app.use((req, res) => {
  let apiRoutes = {
    ingredientesUrl: process.env.BASE_URI + "ingredients",
    recipesUrl:
      process.env.BASE_URI +
      "recipes/{?ingredients,page,pageSize,notIngredients,orderBy,queryName}",
  };
  res.send(apiRoutes);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
