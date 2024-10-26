const mongoose = require("mongoose");
const User = require("./user");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:User,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:User,
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{values} is incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.pre("save",function(){
    const connectionRequest=this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new error("error")
    }
next()
})


connectionRequestSchema.index({fromUserId:1,toUserId:1})


const connectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports=connectionRequestModel