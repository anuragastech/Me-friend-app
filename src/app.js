const express = require('express');
const app = express();  
const connectDB =require("./config/database")
  const User=require("./models/user")
const {validateSignupData}=require("./utils/validate")
const bcrypt=require("bcryptjs")
const cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken")

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
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


app.post("/login", async (req, res) => {
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

      const token=await jwt.sign({_id:match._id},"neeeathadaamoone")
      console.log(token);
      
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

app.patch("/user/:userId", async (req, res) => {
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
  





connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

