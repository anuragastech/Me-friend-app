const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth=async(req,res,next)=>{
    const cookies=req.cookies
    const{token}=cookies;
    const decodeObj= await jwt.verify(token,"neeeathadaamoone")
    const {_id}=decodeObj
    const user=await User.findById(_id);
    if(!user){
       throw new Error("user not found")
    }
    next()
}

module.exports={userAuth}