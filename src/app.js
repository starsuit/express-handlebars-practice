const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");
const session = require("express-session");

const error = require("./controllers/error");
const home = require("./controllers/home");
const login = require("./controllers/login");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "..", "public")));

// app starts a session with a secret - the secret signs the data sent to the browser
app.use(
  session({ secret: "secret sauce", saveUninitialized: false, resave: false })
);
// add bodyParser middleware so the server is equipped to deal with data from a html form
// this deals with the data stream sent from the form - remember chunking/querystring.parse?
app.use(bodyParser.urlencoded({ extended: true }));

// these are our 'router' functions
// ---
// when we get a request to the '/' endpoint, the function 'home' (required above), runs
// 'home' will check if we are already logged in - if not, it will redirect to the login page
app.get("/", home);
// the login route calls the 'login.get' function, which will render the login form on the page
app.get("/login", login.get);
// if a post request is made to the login route, we call the 'login.post' function
// 'login.post' will process the data submitted in the form, and add it to the session
app.post("/login", login.post);

// these functions handle errors
// ---
// if none of the above routes match, then error.missing will run
// (just because it's the next function in the middleware chain)
app.use(error.missing);

// error.server has 4 arguments (err, req, res, next), so express knows it handles errors
// if any errors occur further up the chain, then express skips straight to this error
// kind of like a .catch
app.use(error.server);

// tells express where all the templates are
app.set("views", path.join(__dirname, "views"));
// tells express we are using handlebars
app.set("view engine", "hbs");

// tells handlebars where to find all the different types of templates & functions
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
  })
);

module.exports = app;
