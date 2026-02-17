const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, "students.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View"));


// SHOW FORM + DISPLAY STUDENTS

app.get("/register", (req, res) => {

    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, "[]");
    }

    const data = fs.readFileSync(FILE_PATH);
    const students = JSON.parse(data);

    res.render("form", { allStudents: students });
});


// HANDLE FORM SUBMISSION

app.post("/students/register", (req, res) => {

    const { name, email, branch } = req.body;

    const data = fs.readFileSync(FILE_PATH);
    const students = JSON.parse(data);

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        branch
    };

    students.push(newStudent);

    fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2));

    res.redirect("/register");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});