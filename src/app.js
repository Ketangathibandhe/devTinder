// const express = require("express");

// const app = express();
// // app.use("/",(req,res)=>{
// //     res.send("///////")
// // })
// // app.use("/hello",(req,res)=>{
// //     res.send("Hello Hello Hello")
// // })

// // app.use((req,res)=>{
// //     res.send("Hello from the server")
// // })

// // app.use("/page1",(req,res)=>{
// //     res.send("Your are at the page one")
// // })
// // app.use("/page2",(req,res)=>{
// //     res.send("Your are at the page two")
// // })
// // app.use("/page3",(req,res)=>{
// //     res.send("Your are at the page three")
// // })

// //if we use app.use it will match all the api calls

// //rather doind app.use we can use app.get to handel only GET http call
// // app.get(/ab+cd/, (req, res) => {
// //   res.send({ firsename: "Ketan", lastname: "Gathibandhe" }); //this will handle only GET request
// // });

// // //now if we want to add regex in the path the we should write the path in /..../

// // app.post("/user", (req, res) => {
// //   console.log("Sucessfully saved the data");
// //   res.send("The data has been saved to the database");
// // });

// // app.delete("/delete", (req, res) => {
// //   res.send("Data deleted");
// // });

// // app.get("/data", (req, res) => {
// //   console.log(req.query); //localhost:3000/data?userid=10&password=1234 will print an {userid:10,password:1234} because it contains query parameter
// //   res.send("The data has been received");
// // });

// // //dyanamic routes
// // app.get("/data/:userid/:password", (req, res) => {
// //   console.log(req.params);
// //   res.send("The data is collected ");
// // });

// // app.listen(3000, () => {
// //   console.log("Server is listening on port 3000");
// // });

// //http methods (POST,PATCH,GET,DELETE)
// //to test our API we use POSTMAN

// // multiple route handler or it is also known as middlewares

// // app.use(
// //   "/user",
// //   (req, res, next) => {   // this fun will act as a middleware
// //    // res.send("Response!!!");  
// //     next();         
// //   },
// //   (req, res) => {
// //     res.send("Response 2!!");  // and this is actual request handler in this case
// //   }
// // );

// // app.listen(3000);


// //where actuall the middle wares use the following is the example of this 

// // app.use("/admin",(req,res,next)=>{                        //this is the middleware for checking the user authorization ,
// //   console.log("The admin auth is getting checked!!")      // but instead of writing like this we create a seprate forder for middlewares this is the clean way of using it 
// //   const token = "xyz";
// //   const isAdminAuth = token ==="xyz"
// //   if(!isAdminAuth){
// //     res.status(401).send("Unauthorized request!!")
// //   }else{
// //     next()
// //   }
// // })


// // const {adminauth,paymentauth} = require("./middleware/auth.js")
// // app.use("/admin",adminauth)
// // app.get("/admin/getdata",(req,res)=>{
// //   res.send("All data has been sent")
// // })
// // app.delete("/admin/delete",(req,res)=>{
// //   res.send("The user had been deleted")
// // })

// // app.use("/paycheck",paymentauth)
// // app.get("/paycheck/getpaystatus",(req,res)=>{
// //   res.send("Payment is successful")
// // })


// //error handling 

// app.use("/getUserData",(req,res)=>{
//   try{
//     //logic of fetching the data from the DB
//     throw new Error("gvrhrh");
//     res.send("userdata sent")                            //this is the proper way of handling error
//   }catch{
//     res.status(500).send("Somthing went wrong")
//   }
// })

// app.use("/",(err,req,res,next)=>{
//   if(err){
//     res.status(500).send("something went wrong")
//   }
// })

// // error status code
// // Informational responses (100 – 199)
// // Successful responses (200 – 299)
// // Redirection messages (300 – 399)
// // Client error responses (400 – 499)
// // Server error responses (500 – 599)

// app.listen(3000);

//Project

const express = require("express")
const { connectDB } = require("./config/database.js")
const app = express()
// lets build some APIs
const User = require('./models/user.js')
app.post("/signup",async(req,res)=>{
    //creating instance of user model
   const user = new User({
    firstName:"Ketan",
    lastName:"Gathibandhe",
    emailId:"ketangathibandhe04@gmail.com",
    password:"1234"
   })
   
   try{
    await user.save()
   res.send("User added successfully!")
   }
   catch(err){
    res.status(400).send("Error saving the user :"+ err.message)
   }
})

connectDB()
    .then(()=>{
        console.log("Database connection established...")
        app.listen(3000,()=>{
          console.log("listening on port 3000....")
        })
    })
    .catch((err)=>{
        console.error("Database cannot be connected!!")
    })

