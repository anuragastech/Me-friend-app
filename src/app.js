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

