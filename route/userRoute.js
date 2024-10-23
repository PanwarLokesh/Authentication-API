const express= require("express");
const userController  = require("../controller/userController");
const isAuthorized = require("../middleware/IsAuth");
const userRouter= express.Router();

userRouter.post("/api/users/register",userController.register);
userRouter.post("/api/users/login",userController.login);
userRouter.get("/api/users/profile",isAuthorized,userController.profile);
module.exports = userRouter;