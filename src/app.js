const express = require('express');

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from '/'")
});
app.use("/one",(req,res)=>{
    res.send("Hello from '/one'")
});
app.use("/two",(req,res)=>{
    res.send("Hello from '/two'")
});

app.listen(3001,()=>{
    console.log("liestning to port 3000...")
})