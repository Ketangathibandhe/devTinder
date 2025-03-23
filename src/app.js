const express = require('express');

const app = express();

// app.use("/",(req,res)=>{  the route "/" can not be work here because if we do so then other request starting from "/" will also be handled by this only which we not want 
//     res.send("Hello from '/'") 
// });


//and here order of writing routes is important .if we paste the above req handler to the bottom of this code then it will work properly 


// app.use("/test",(req,res)=>{
//     res.send("Hello from '/'")
// });
// app.use("/one",(req,res)=>{
//     res.send("Hello from '/one'")
// });
// app.use("/two",(req,res)=>{
//     res.send("Hello from '/two'")
// });

// if we use app.use , this will match all the http method API calls

//now 
//this app.get will only match and respond to the GET http method 
app.get("/test",(req,res)=>{
    res.send({ firstname:"Ketan", Lastname:"gathibandhe" })
})

app.post("/test",(req,res)=>{
    console.log("Save data to the database");
    res.send("Data is successfully saved to the database")
})

app.delete("/test",(req,res)=>{
    res.send("Deleted successfully");
})

// in this way we can get parameters from the user 
// for this the URL will be somthing like this: http://localhost:3001/test?userId=101&name=Ketan

app.get("/test",(req,res)=>{
    console.log(req.query)
    res.send({ firstname:"Ketan", Lastname:"gathibandhe" })
})

//or dynamically we can do this like 
app.get("/test/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({ firstname:"Ketan", Lastname:"gathibandhe" })
})

//multiple route handler ,next()
// app.get("/user",(req,res,next)=>{
//     next()
// },(req,res,next)=>{
//     res.send("response2!!")
// },(req,res,next)=>{
//     res.send("response3!!")
// })

//or we can do multiple route handling in the following way 
// app.get("/user",(req,res,next)=>{
//     next()
// });
// app.get("/user",(req,res,next)=>{
//     //res.send("response2!!")
//     next()
// });
// app.get("/user",(req,res,next)=>{
//    res.send("response3!!")
// })

//middlewares

// app.use("/admin",(req,res,next)=>{
//     console.log("Admin auth is getting checked!!")
//     const token = "xyz"
//     const isAdminAuthorized = token==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")
//     }else{
//         next()
//     }
// });

// instead of writing this middle ware like this we can make a seperate folder for middlewares

const {adminAuth ,userAuth} = require('./middlewares/auth');
app.use("/admin",adminAuth)

app.get("/admin/getAlldata",(req,res)=>{
    res.send("All data sent")
})
app.get("/user",userAuth,(req,res)=>{
    res.send("user data sent")
})
app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user")
});

app.listen(3001,()=>{
    console.log("liestning to port 3001...")
})