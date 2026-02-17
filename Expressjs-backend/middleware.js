const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8000;

/*LOGGER MIDDLEWAR*/

app.use((req, res, next) => {
  const log = `\nRequest at: ${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.url}`;
  
  fs.appendFile("Log.txt", log)
    .catch(err => console.error(err));

  next();
});

/* AUTH MIDDLEWARE*/

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];  

  if (!token) {
    return res.status(401).json({
      message: "Token missing. Access denied"
    });
  }

  if (token === "mysecrettoken") {
    console.log("User authenticated");
    next(); 
  } else {
    return res.status(403).json({
      message: "Invalid token"
    });
  }
};

/*TEST MIDDLEWARES*/

app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("I am middleware 2");
  next();
});

/* PROTECTED ROUTE */

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome! You are authenticated"
  });
});


app.get("/", (req, res) => {
  res.send("Public route — no auth needed");
});

/* SERVER*/

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});