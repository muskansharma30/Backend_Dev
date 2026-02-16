const http=require("http");
const url = require("url");

const server= http.createServer((req,res)=>{
    const parsedUrl= url.parse(req.url, true);
    console.log(parseUrl)
    const name= parsedUrl.query;


    switch(req.url){
        case "/":
            res.end("welcome to home page")
            break;
        case "/about-us":
            //const 


    }
})