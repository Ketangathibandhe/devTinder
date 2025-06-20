const express = require("express")
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter