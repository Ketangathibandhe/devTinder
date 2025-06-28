const mongoose = require("mongoose")
const connectDB=async()=>{
await mongoose.connect("mongodb+srv://ketan:l40c1rBPQ95qaIyi@cluster0.b7jzqx6.mongodb.net/devTinder")
}

// connectDB()
//     .then(()=>{
//         console.log("Database connection established...")
//     })
//     .catch((err)=>{
//         console.error("Database cannot be connected!!")
//     })

//we will use this in app.js
module.exports={connectDB}

