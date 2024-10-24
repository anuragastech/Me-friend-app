const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const {validateEditProfileData}=require("../utils/validate")




// router.patch("/user/:userId", async (req, res) => {
//     const userId = req.params.userId;
//     const data = req.body;
//   console.log(userId);
  
//     try {
//       const ALLOWED_UPDATES = ["firstName", "lastName", "password", "age", "gender", "skill"]; 
  
//       const isUpdateAllowed = Object.keys(data).every((key) =>
//         ALLOWED_UPDATES.includes(key)
//       );
  
//       if (!isUpdateAllowed) {
//         return res.status(400).send({ error: "Invalid updates!" });
//       }
  
//       const user = await User.findByIdAndUpdate(userId, data, {
//         returnDocument:"before",      
//         runValidators: true, 

//       });
//   console.log(user);
  
//       if (!user) {
//         return res.status(404).send({ error: "User not found!" });
//       }
  
//       res.status(200).send(user); 
//     } catch (error) {
//       res.status(500).send({ error: "Failed to update the user." }); 
//     }
//   });




router.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
if(validateEditProfileData(req)){
    throw new error("invalid of edit request")

}
const loggedInUser=req.user 

Object.keys(req.body).forEach((key) => {
    loggedInUser[key] = req.body[key];
});

await loggedInUser.save();

res.json({ message: `${loggedInUser.firstName}, your profile has been updated.` });

    }catch(error){
        res.status(400).json({
            error: error.message || "Something went wrong while updating the profile"
        });
    }
})

router.get("/profile/view",userAuth,async(req,res)=>{
    try{
const loggedInUser=req.user 


const profileData =loggedInUser
if(!profileData){
    res.status(400).json({message:" error in fetching data  "})
}

res.json({message:"succesfull",profileData})
    }catch(error){
        res.status(500).json({message:" profile  data not available "})
    }
})





module.exports = router;