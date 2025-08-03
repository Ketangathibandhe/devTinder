const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator"); //this is a standard npm validator which makes validation easy

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: "Profile updated successfully",
      Data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/forgotPassword", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // Validate input
    if (!emailId || !password) {
      return res.status(400).send("Email and password are required");
    }
    // Find user by email
    const user = await User.findOne({ emailId });
    if (!user) {
      return res
        .status(200)
        .send("If the account exists, password has been reset."); // Don't reveal if user exists
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password : " + password + " is too weak");
    } else {
      // Hash new password
      var passwordHash = await bcrypt.hash(password, 10);
    }

    // Update password
    user.password = passwordHash;
    await user.save();

    res.send("Password reset successful");
  } catch (err) {
    res.status(500).send("Error :" + err.message);
  }
});

module.exports = profileRouter;
