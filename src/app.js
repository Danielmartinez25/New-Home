require("dotenv").config();
let createError = require("http-errors");
let express = require("express");
let session = require("express-session");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const methodOverride = require("method-override");

const localsUserCheck = require("./middlewares/localsUserCheck");
const cookieCheck = require("./middlewares/cookieCheck");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let productsRouter = require("./routes/products");
let subcategoryRouter = require('./routes/subcategory')
let categoryRouter = require("./routes/category");
let indexRouterApi = require('./routes/api/index');
let productsRouterApi = require('./routes/api/products'); 
let usersRouterApi = require('./routes/api/users');


let app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieCheck);
app.use(localsUserCheck);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use('/subcategory',subcategoryRouter);
app.use("/category", categoryRouter);
app.use("/api", indexRouterApi);
app.use("/api/products", productsRouterApi);
app.use("/api/users", usersRouterApi);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
