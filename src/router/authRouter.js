const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {validateSignupData}=require("../utils/validate")



router.post("/signup",async(req,res)=>{
    // validateSignupData(req);
    console.log(req.body);
    const {firstName,lastName,emailid,age,skill,password,gender}=req.body
    const passwordHash=await bcrypt.hash(password,10)
    console.log(passwordHash);
    
    const user=new User({
        firstName,lastName,emailId:emailid,password:passwordHash,age,skill,gender
    })
    await user.save()
    try{
        res.send("success")        

    }catch(err){
console.log("data not added");

    }
})


router.post("/login", async (req, res) => {
  const { emailid, password } = req.body;

  try {
//     const cookies = req.cookies; 
//     const { token } = cookies; 
// console.log(cookies);
// console.log(token);          

    const match = await User.findOne({ emailId: emailid }); 

    if (!match) {
      return res.status(404).send({ error: "invalid credential" });
    }

    const isPasswordValid = await bcrypt.compare(password, match.password);

    if (isPasswordValid) {

      // const token=await jwt.sign({_id:match._id},"neeeathadaamoone")
      const token=await match.getJWT();  //here match means userdata 
      // console.log(token);
      
      res.cookie("token",token)


      res.send({ message: "Login successful" });
    } else {
      return res.status(401).send({ error: "invalid credential" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/logout", userAuth, async (req, res) => {
  try {
    const { token } = req.cookies;
    
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    
    });
    
    res.status(200).send({ message: "Logout successful" });
    
  } catch (error) {
    res.status(500).json({ message: "Logout error" });
  }
});

module.exports = router;