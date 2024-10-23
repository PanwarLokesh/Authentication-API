const jwt = require("jsonwebtoken");
const isAuthorized = async (req,res,next) => {
    const token = (req.headers.authorization).split(" ")[1];
    const verifyToken = jwt.verify(token,"mysecretkey",(err,decoded)=>{
        if(err){
            return false;
        }
        else{
            return decoded;
        }
    });
    if(verifyToken){
        req.user=verifyToken.id;
        next();
    }
    else{
        const err = new Error("Token Expired Please LogIn Again");
        next(err);
    }

}

module.exports = isAuthorized;