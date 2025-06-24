const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js")
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status type!");
      }

      const toUser = await User.findById(toUserId)
      if(!toUser){
        return res.status(404).json({Message:"User not found"})
      }

      const exestingConnectionRequest = await ConnectionRequest.findOne({
        $or: [   //or condition   query  this is mongo DB thing
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if(exestingConnectionRequest){
        return res.json({
          message:"Connection request already exist!"
        })
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

module.exports = requestRouter;
