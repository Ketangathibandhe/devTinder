// function adminauth(req,res,next){                        
//   console.log("The admin auth is getting checked!!")     
//   const token = "xyz";
//   const isAdminAuth = token ==="xyz"
//   if(!isAdminAuth){
//     res.status(401).send("Unauthorized request!!")
//   }else{
//     next()
//   }
// }

// function paymentauth(req,res,next){
//     console.log("The payment status is under proces")
//     const paymentid ="123xyz"
//     const ispaymentauth = paymentid==="123xyz"
//     if(!ispaymentauth){
//         res.status(401).send("Payment is not done yet!")
// }else{
//     next()
// }}

// module.exports={adminauth,paymentauth}

const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req,res,next)=>{
try{
    const {token} = req.cookies;
    if(!token){
     return res.status(401).send("Please Login!!")  
    }
  const decodedObj= await jwt.verify(token,"DEV@Tinder$790");
  const {_id}= decodedObj;
  const user = await User.findById(_id)
  if(!user){
    throw new Error("User does not exist")
  }
  req.user = user
  next()
}catch(err){
  res.status(400).send("ERROR: "+err.message)
}

}
module.exports={userAuth}