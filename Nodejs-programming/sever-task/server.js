const http=require("http");
const server=http.createServer((req,res)=>{
    switch(req.url){
        case "/":
            res.end("welcome to home page")
            break;
        case "/about-us":
            req.end("welcome to about us")
    default:
        res.writeHead(404,{"content-type":"text/html"})            
    }

})
server.listen(8000,()=>{
    console.log("server is running on port 8000")
})