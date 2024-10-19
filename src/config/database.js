const mongoose = require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://anurag:9A7Ld8CEMhSNMHNd@cluster0.9mscwvc.mongodb.net/Tinder"
 
          )
}
// connectDB()
//   .then(() => {
//     console.log("Connected to the database");
 
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database:", error);
//   });


module.exports = connectDB;
