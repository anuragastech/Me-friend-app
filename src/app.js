const express = require('express');
const app = express();  
const connectDB =require("./config/database")
  const User=require("./models/user")
app.use(express.json());

app.post("/signup",async(req,res)=>{
    console.log(req.body);
    
    const user=new User(req.body)
    await user.save()
    try{
        res.send("success")        

    }catch(err){
console.log("data not added");

    }
})

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

