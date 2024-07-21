const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up express-session before passport
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

// Initialize passport strategy
require("./utils/googlePassportStrategy");

// Routes
app.get("/", (req, res) => {
  res.send("Google Authentication");
});

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);
