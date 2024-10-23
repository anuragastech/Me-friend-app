const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const connectionRequestModel=require("../models/connectionRequest");




router.post("/request/send/:status/interested/:toUser_id", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUser_id; 
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists" });
        }

        const userToSendRequest = await User.findById(toUserId);
        if (!userToSendRequest) {
            return res.status(400).json({ message: "User not found" });
        }

        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save(); 

        return res.json({ message: "Connection request sent successfully", data });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "An error occurred" }); 
    }
});


router.post("",userAuth,async(req,res)=>{

})

module.exports = router;