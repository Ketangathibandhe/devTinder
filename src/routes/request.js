const express = require("express")
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending connection req
  const user = req.user
  res.send(user.firstName+" sent connection request..");
});


module.exports = requestRouter