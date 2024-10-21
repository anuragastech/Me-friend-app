const jwt=require("jsonwebtoken")
const User=require("./config/database")

const userAuth=async(req,res,next)=>{
    const cookies=req.cookies
    const{token}=cookies;
    const decodeObj=await jwt.verify("token","neeeathadaamoone")
    const {_id}=decodeObj
    const user=await User.findById(_id);
    if(!user){
        throw new error("user not fount ")
    }
    next()
}

module.exports={userAuth}