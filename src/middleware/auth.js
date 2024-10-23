const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            throw new Error("Authentication token missing");
        }


        const decodeObj = await jwt.verify(token, "neeeathadaamoone");
        const { _id } = decodeObj;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ error: error.message || "Authentication failed" });
    }
};




module.exports={userAuth}