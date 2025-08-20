const jwt = require("jsonwebtoken");
const loginSchema=require("../Databases/LoginModule");

module.exports=async (req, res, next) => {
        if (!req.cookies.token) {
            return res.status(401).json({ error: "Please log in" });
        }
    
    try{
        let decode =jwt.verify(req.cookies.token, "manvith");
        let user = await loginSchema.findOne({Username:decode.username}).select("-Password");
        req.user = user;    
        next();
    }catch{
        res.send("middleware error");
    }
}
