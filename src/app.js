const express = require('express');

const app = express();

// app.use("/",(req,res)=>{  the route "/" can not be work here because if we do so then other request starting from "/" will also be handled by this only which we not want 
//     res.send("Hello from '/'") 
// });


//and here order of writing routes is important .if we paste the above req handler to the bottom of this code then it will work properly 


// app.use("/test",(req,res)=>{
//     res.send("Hello from '/'")
// });
// app.use("/one",(req,res)=>{
//     res.send("Hello from '/one'")
// });
// app.use("/two",(req,res)=>{
//     res.send("Hello from '/two'")
// });

// if we use app.use , this will match all the http method API calls

//now 
//this app.get will only match and respond to the GET http method 
app.get("/test",(req,res)=>{
    res.send({ firstname:"Ketan", Lastname:"gathibandhe" })
})

app.post("/test",(req,res)=>{
    console.log("Save data to the database");
    res.send("Data is successfully saved to the database")
})

app.delete("/test",(req,res)=>{
    res.send("Deleted successfully");
})

app.listen(3001,()=>{
    console.log("liestning to port 3001...")
})