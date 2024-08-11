require('dotenv').config()
const express = require("express")
const app = express();
const port = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.get('/twitter',(req,res)=>{
    res.send("Hello twitter")
})

app.get("/login",(req,res)=>{
    res.send('<h1>please login at chai aur javascript</h1>')
})

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${port}`)
})

