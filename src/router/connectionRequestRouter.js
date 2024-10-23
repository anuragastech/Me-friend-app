const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const connectionRequestModel=require("../models/connectionRequest");
const { SiEndeavouros } = require("react-icons/si");



router.post("/request/send/:status/interested/:toUser_id",userAuth,async(req,res)=>{
    try{

const fromUserId=req.user._id
const toUserId=req.params.toUserId
const status=req.params.status

const allowedStatus=["ignored","interested"];
if(!allowedStatus.includes(status)){
    return res.status(400).send.json({messege:"invalid status "});

}

const existingConnectionRequest = await connectionRequestModel.findOne({
    $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
    ]
});
if(existingConnectionRequest){
    return res.status(400).res.json({messege:"already exist"})
}


const userToSendRequest=await User.findById(toUserId)

if(!userToSendRequest){
    return res.status(400).res.json({messege:"already exist"})

}


const connectionRequest=new connectionRequestModel(
    fromUserId,toUserId,status
)



const data=await connectionRequest.save()

res.json(   {messege:"connection reqest send successfully"})
    }catch(errr){
res.json({messege:"error",data})
    }
})

module.exports = router;