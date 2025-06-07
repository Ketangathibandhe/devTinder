const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    passWord:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

//now we create a mongoose model 

module.exports = mongoose.model("User",userSchema)
//now we can create APIs to add user into database