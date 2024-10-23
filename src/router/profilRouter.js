const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');





router.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
  console.log(userId);
  
    try {
      const ALLOWED_UPDATES = ["firstName", "lastName", "password", "age", "gender", "skill"]; 
  
      const isUpdateAllowed = Object.keys(data).every((key) =>
        ALLOWED_UPDATES.includes(key)
      );
  
      if (!isUpdateAllowed) {
        return res.status(400).send({ error: "Invalid updates!" });
      }
  
      const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument:"before",      
        runValidators: true, 

      });
  console.log(user);
  
      if (!user) {
        return res.status(404).send({ error: "User not found!" });
      }
  
      res.status(200).send(user); 
    } catch (error) {
      res.status(500).send({ error: "Failed to update the user." }); 
    }
  });
  
router.get("/profile",userAuth,async(req,res)=>{
  res.send("okokkok")
})


module.exports = router;