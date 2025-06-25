const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{values} is incorrect status type `,
      },
    },
  },
  { timestamps: true }
);

//
connectionRequestSchema.index({toUserId:1 , fromUserId:1})

//this is like middleware which is called before saving somethig in the DB  , it is something like schema methods
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if the from userId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cant send connection request to yourself !");
  }
  next();
});


const ConnectRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectRequestModel;
