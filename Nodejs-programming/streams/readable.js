const fs = require("fs");

const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt")

const readStream = fs.createReadStream(inputFilePath, {encoding:"utf-8"});

readStream.on("data",(chunk)=>{
    console.log("data is recieved in chunk")
})

readStream.on("end",()=>{
    console.log("readStream in end");
})

readStream.on("error",(err)=>{
    console.log("Error occure:", err.message)
})