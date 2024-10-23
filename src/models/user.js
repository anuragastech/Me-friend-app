const mongoose = require("mongoose");
const validate = require('validate');
const jwt=require("jsonwebtoken")

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 5,
    max: 50,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid"); 
      }
    },
  },
  skill: {
    type: [String],
  }
}, {
  timestamps: true, 
});


userSchema.methods.getJWT = async function () {
  const user = this; 
  const token = await jwt.sign(
    { _id: user._id },   
    "neeeathadaamoone",  
    { expiresIn: "7d" }    
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
