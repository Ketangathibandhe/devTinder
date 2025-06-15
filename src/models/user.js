const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // if this info is not there then will not be added to the database
    minLength:2,
    maxLength:30
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // email id will be unique now and will now allow 2 users with the same emialid
    lowercase: true,
    trim:true,
    validate(value){
        var validator = require('validator');    //this is a standard npm validator which makes validation easy
     if(!validator.isEmail(value)){
        throw new Error("Email is not valid :"+ value)
     }
    }
  },
  password: {
    type: String,
    required: true,
   validate(value){
        var validator = require('validator');    //this is a standard npm validator which makes validation easy
     if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password :"+ value)
     }
    }
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    validate:function(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender data is not valid")
        }
    }
  },
  photoUrl: {
    type: String,
    default:"https://wallpapercave.com/wp/wp12696557.jpg"
  },
  about:{
    type: String,
  },
  skills:{
    type: [String],
  }
},{
    timestamps:true
});

userSchema.methods.getJWT = async function() {
  const user = this
   const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790" ,{expiresIn:"7d"});
   return token
}


userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this
  const passwordHash = user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid
}


//now we create a mongoose model

module.exports = mongoose.model("User", userSchema);
//now we can create APIs to add user into database
