const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const requestReceivedModel=require("../models/connectionRequest");
const connectionRequestModel = require("../models/connectionRequest");




router.get("/user/request/received", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const connectionRequests = await connectionRequestModel.findOne({
        toUserId: loggedInUser._id,
        status: "interested"
      }).populate("fromUserId", ["firstName", "lastName"]);
  
      if (!connectionRequests) {
        res.status(400).json({ messege: "Request cannot be found" });
      }
  
      console.log(connectionRequests);
  
      res.json({
        messsege: "succuss",
        data: connectionRequests
      });
  
    } catch (error) {
      res.status(500).json({ messege: " request cannot find " });
    }
  });








module.exports = router;