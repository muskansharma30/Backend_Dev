const fs = require("fs")

const path = require("path")
const {transform} = require("Stream");

const inputFilePath = path.join(__dirname, "input.txt")

const transformOutputFilePath = path.join(__dirname,"transformOutputFilePath")

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(transformOutputFilePath);

const upperCaseTransform = newTransform({
    transform(chunk,encoding,callback)
    {
        const transformedChunk = chunk.toString().toUpperCase();
        this.push(transformedChunk);
        callback(;)
    }
})

readStream.pipe(upperCaseTransform).pipe(writeStream);