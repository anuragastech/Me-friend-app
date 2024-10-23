const express = require('express');
const app = express();  
const connectDB =require("./config/database")
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./router/authRouter");
const connectionRequestRouter=require("./router/connectionRequestRouter");
const profileRouter=require("./router/profilRouter");
const userRouter=require("./router/userRouter");


app.use("/",authRouter);
app.use("/",connectionRequestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);





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

