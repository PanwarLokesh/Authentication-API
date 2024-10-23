const User= require("../model/UserModel");


const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const userController= {
    //! Register
    register: asyncHandler(async(req,res)=>{
        const {username,email,password}= req.body;
        if(!username || !email || !password){
            res.status(400);
            throw new Error("All fields are required!!");
        }
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error("User already exists!!");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user =  await User.create({
            username,
            email,
            password:hashedPassword
        })
        res.status(200).json({
            username:user.username,
            email:user.email
        });
        console.log(user);
    }),

    //! login
    login: asyncHandler(async (req,res)=>{
        const {email,password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            res.status(400);
            throw new Error("Invalid Login Credentials!!");
        }
        const checkPassword= bcrypt.compare(password,user.password);
        if(!checkPassword){
            res.status(400);
            throw new Error("Invalid Login Credentials!!");
        }
        const token = jwt.sign({id:user._id},"mysecretkey",{expiresIn:"3d"});
        res.status(200).json({
            message:"Login Success!!",
            username:user.username,
            id:user._id,
            email,
            token,
        })
    }),
    profile:asyncHandler(async(req,res)=>{
        const id= req.user;
        const user = await User.findById(id).select("-password");
        res.status(200).json({user});
    })
}
module.exports = userController;