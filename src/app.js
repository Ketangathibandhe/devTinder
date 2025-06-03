const express = require("express");

const app = express();
// app.use("/",(req,res)=>{
//     res.send("///////")
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello Hello")
// })

// app.use((req,res)=>{
//     res.send("Hello from the server")
// })

// app.use("/page1",(req,res)=>{
//     res.send("Your are at the page one")
// })
// app.use("/page2",(req,res)=>{
//     res.send("Your are at the page two")
// })
// app.use("/page3",(req,res)=>{
//     res.send("Your are at the page three")
// })

//if we use app.use it will match all the api calls

//rather doind app.use we can use app.get to handel only GET http call
app.get(/ab+cd/, (req, res) => {
  res.send({ firsename: "Ketan", lastname: "Gathibandhe" }); //this will handle only GET request
});

//now if we want to add regex in the path the we should write the path in /..../

app.post("/user", (req, res) => {
  console.log("Sucessfully saved the data");
  res.send("The data has been saved to the database");
});

app.delete("/delete", (req, res) => {
  res.send("Data deleted");
});

app.get("/data", (req, res) => {
  console.log(req.query); //localhost:3000/data?userid=10&password=1234 will print an {userid:10,password:1234} because it contains query parameter
  res.send("The data has been received");
});

//dyanamic routes
app.get("/data/:userid/:password", (req, res) => {
  console.log(req.params);
  res.send("The data is collected ");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//http methods (POST,PATCH,GET,DELETE)
//to test our API we use POSTMAN
