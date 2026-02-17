const express = require("express");
const app = express();

app.set("view engine", "ejs");

// form data read karne ke liye
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("form");   // views/form.ejs load karega
});

// Form submit
app.post("/students/register", (req, res) => {
    console.log(req.body);   // name & branch terminal me dikhega

    res.send("Student Registered Successfully ");
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});