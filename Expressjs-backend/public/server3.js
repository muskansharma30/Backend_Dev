const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

const FILE = "users.json";

async function readUsers() {
    try {
        const data = await fs.readFile(FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(FILE, JSON.stringify(users, null, 2));
}

app.get("/", async (req, res) => {
    const users = await readUsers();
    res.render("form", { users });
});

app.post("/students/register", async (req, res) => {
    const { name, age, branch } = req.body;

    if (!name || !age || !branch) {
        return res.send("All fields required");
    }

    const users = await readUsers();

    const newUser = {
        id: users.length + 1,
        name,
        age,
        branch
    };

    users.push(newUser);
    await saveUsers(users);

    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});