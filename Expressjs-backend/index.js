const express = require("express");

const app = express();

const PORT = 8000;

app.get("/user", (req, res)=>{
    res.send("<h1>welcome to home page</h1>")
})

app.get("/user/:id", (req, res)=>{
    const UserId = req.params.id
    res.send('you are requesting for user: ${userid}')
    
})

app.listen(PORT, ()=>{
    console.log('server is running on port ${port}');
});