const express = require("express");
const cors = require("cors");

const users = require("./users");

const app = express();
const port = 8000;

const loginApi = require("./login");
const signupApi = require("./signup");

app.get("/", (req, res) => {
  res.json(users);
});

app.use(cors());
app.use("/api/login", loginApi);
app.use("/api/register", signupApi);

app.listen(port);

module.exports = app;
