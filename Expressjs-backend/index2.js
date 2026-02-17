const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;

// middleware to read JSON body
app.use(express.json());

const students = [
    { id: 1, name: "raj", branch: "CSE" },
    { id: 2, name: "rahul", branch: "ECE" },
    { id: 3, name: "rishi", branch: "IT" },
];

app.get("/", (req, res) => {
    res.send("welcome to home page");
});

app.get("/students", (req, res) => {
    res.json(students);
});

// search by branch
app.get("/students/search", (req, res) => {
    const branch = req.query.branch;

    if (!branch) {
        return res.json(students);
    }

    const foundStudents = students.filter(
        (s) => s.branch.toLowerCase() === branch.toLowerCase()
    );

    res.json(foundStudents);
});

// get by id
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// register student 
app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).send("Details missing");
    }

    fs.readFile("./students.json", "utf-8", (err, data) => {
        let fileStudents = [];

        if (!err && data) {
            fileStudents = JSON.parse(data);
        }

        const newStudent = {
            id: fileStudents.length > 0 ? fileStudents[fileStudents.length - 1].id + 1 : 1,
            name,
            branch,
        };

        fileStudents.push(newStudent);

        fs.writeFile(
            "./students.json",
            JSON.stringify(fileStudents, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).send("Error writing file");
                }

                res.status(201).json({
                    message: "Registered successfully",
                    student: newStudent,
                });
            }
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});