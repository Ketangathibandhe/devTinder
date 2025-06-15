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

const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js"); //helper function or validator function
const bcrypt = require("bcrypt"); //library used for encrypting password
const cookieParser = require("cookie-parser"); //cookies ko JavaScript object me convert kar deta hai taaki unhe easily access kiya ja sake.

app.use(express.json()); //this is like a middleware which is provided by the express and it converts the actual JSON into JS objects
//built-in middleware function hai Express.js ka jo incoming request body JSON format se JS object me parse karta hai.

app.use(cookieParser()); //this is the middleware used to read cookie

const jwt = require("jsonwebtoken"); //jsonwebtoken (JWT) is a powerful library to generate and verify JWT

const { userAuth } = require("./middleware/auth.js");

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    //validation of data
    validateSignUpData(req);

    // Encrypt the password  for this we use a npm library called bcrypt
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Store hash in your password DB.
    console.log(passwordHash);

    //creating instance of user model
    const user = new User(
      //     {
      //     firstName:"Ketan",
      //     lastName:"Gathibandhe",
      //     emailId:"ketangathibandhe04@gmail.com",    //this is hard coded and is exactly same as req.body
      //     password:"1234"
      //    }
      // req.body  //this is not the correct way
      {
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      }
    );

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

//login API

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials !");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
      const isPasswordValid = await user.validatePassword(password, user.password)
    if (isPasswordValid) {
      //create a JWT token
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790" ,{expiresIn:"1d"});
      const token = await user.getJWT()
      // console.log(token);
      //Add the token to the cookie and send the response back to user
      res.cookie("token", token ,{expires:new Date(Date.now()+8*3600000)});
      res.send("User logged in successfully !");
    } else {
      throw new Error("Invalid credentials !");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

//profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies; //in order to read this cookie we will require a middleware called cookie-parser which is provided by npm
    // const { token } = cookies;
    // if (!token) {
    //   throw new Error("Invalid Token");
    // }
    // //Validate token
    // const decodeMessage = await jwt.verify(token, "DEV@Tinder$790");
    // const { _id } = decodeMessage;
    // // console.log("Logged in user is :" + _id);
    // const user = await User.findById(_id);
    // if (!user) {
    //   throw new Error("User does not exist !");
    // }
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

// //get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });
// //feed-API GET/feed all the users for the database
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //now lets make update and delete API

// app.delete("/user", async (req, res) => {
//   const userId = await req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User is successfully deleted!!");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Api to update the data of the user
// app.patch("/user/:userId", async (req, res) => {
//   const userId = await req.params?.userId;
//   const data = req.body;

//   try {
//     //Api level validation
//     const ALLOWED_UPDATES = [
//       "userId",
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//     ]; //it will only allow to update the keys which are present over here
//     const isupdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isupdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Update not allowed");
//     }
//     await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("User data updated successfully !");
//   } catch (err) {
//     res.status(400).send("Update fail:" + err.message);
//   }
// });

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending connection req
  const user = req.user
  res.send(user.firstName+" sent connection request..");
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("listening on port 3000....");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
