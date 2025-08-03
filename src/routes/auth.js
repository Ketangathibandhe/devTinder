const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js"); //helper function or validator function
const bcrypt = require("bcrypt"); //library used for encrypting password

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    //validation of data
    validateSignUpData(req);

    // Encrypt the password  for this we use a npm library called bcrypt
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Store hash in your password DB.

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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials !");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(
      password,
      user.password
    );
    if (isPasswordValid) {
      //create a JWT token
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790" ,{expiresIn:"1d"});
      const token = await user.getJWT();
      // console.log(token);
      //Add the token to the cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials !");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, { expires: new Date(Date.now()) })
      .send("Logged out successfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = authRouter;
