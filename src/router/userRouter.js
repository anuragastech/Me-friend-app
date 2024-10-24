const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const requestReceivedModel=require("../models/connectionRequest");
const connectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_Data=["firstName","lastName","age","photo"]


router.get("/user/request/received", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const connectionRequests = await connectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
      }).populate("fromUserId", ["firstName", "lastName"]);
  
      if (!connectionRequests) {
        res.status(400).json({ message: "Request cannot be found" });
      }
  
      console.log(connectionRequests);
  
      res.json({
        messsege: "succuss",
        data: connectionRequests
      });
  
    } catch (error) {
      res.status(500).json({ message: " request cannot find " });
    }
  });

router.get("/user/connections",userAuth,async(req,res)=>{
    try{

const loggedInUser=req.user
const connections=await connectionRequestModel.find({
 $or:[
    {fromUserId:loggedInUser,status:"accepted"},
    {toUserId:loggedInUser,status:"accepted"}
 ]
}).populate("fromUSerId",USER_SAFE_Data).populate("toUserId",USER_SAFE_Data)



if(!connections){
    res.status(400).json({message:"connections not found "})
}

const data=connections.map((row)=>{
    if(row.fromUserId._id.String()===loggedInUser._id.String()){
        return row.toUserId
    }
    row.fromUserId
})

res.json({messege:"success",data})
    }catch(error){
        res.status(500).json({message:"connection not found  error"})
    }
})
router.get("/feed", userAuth, async (req, res) => {
    const loggedInUser = req.user;
  
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const skip=(page-1)*limit;
    try {
      const connectionRequest = await connectionRequestModel.find({
        $or: [
          { fromUserId: loggedInUser._id },
          { toUserId: loggedInUser._id }
        ]
      });
  
      const hideUsersFromFeed = new Set();
  
      connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      });
  
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } }
        ]
      }).select(USER_SAFE_Data).skip(skip).limit(limit)
  
      res.send(users);
      
    } catch (error) {
      res.status(500).json({ message: "Unable to fetch data" });
    }
  });
  



module.exports = router;