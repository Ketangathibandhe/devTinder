function adminauth(req,res,next){                        
  console.log("The admin auth is getting checked!!")     
  const token = "xyz";
  const isAdminAuth = token ==="xyz"
  if(!isAdminAuth){
    res.status(401).send("Unauthorized request!!")
  }else{
    next()
  }
}

function paymentauth(req,res,next){
    console.log("The payment status is under proces")
    const paymentid ="123xyz"
    const ispaymentauth = paymentid==="123xyz"
    if(!ispaymentauth){
        res.status(401).send("Payment is not done yet!")
}else{
    next()
}}

module.exports={adminauth,paymentauth}