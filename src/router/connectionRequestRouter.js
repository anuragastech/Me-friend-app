const express=require("express");
const router=express.Router()
const User=require("../models/user")
const { userAuth } = require('../middleware/auth');



module.exports = router;