const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');
const {validateEditProfileData}=require("../utils/validate")
const bcrypt= require("bcryptjs")


router.patch("/profile/password/edit", userAuth, async (req, res) => {
    const { password } = req.body; 

    try {
        const loggedInUser = req.user; 

        if (!loggedInUser) {
            return res.status(404).json({ error: "User not found!" });
        }

        const ALLOWED_UPDATES = ["password"];
        const isUpdateAllowed = Object.keys(req.body).every((key) =>
            ALLOWED_UPDATES.includes(key)
        );

        if (!isUpdateAllowed) {
            return res.status(400).json({ error: "Invalid updates!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        loggedInUser.password = hashedPassword;

        const updatePasswordUser = await loggedInUser.save();

        console.log(updatePasswordUser);

        res.status(200).json({ message: "Password updated successfully!", user: updatePasswordUser });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Failed to update the user." });
    }
});


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