const express = require("express")
const { userAuth } = require("../middleware/auth")
const userRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest.js")

// get all the pending connection request for the Loggedin user 
userRouter.get("/user/request/received", userAuth ,async(req,res)=>{
      try {
        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","about","skills"])

        res.json({message:"Data fetched successfully!",data:connectionRequest})
      } catch (err) {
        res.status(400).send("Error: "+err.message)
      }

})

module.exports= userRouter