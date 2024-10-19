const express = require('express');
const app = express();  
const connectDB =require("./config/database")
  
app.use((req,res)=>{
    res.send("hello")
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

