const express=require('express')
const route=express.Router()
const userController=require("../controllers/userController");
const DesignController=require("../controllers/DesignController")
const Middleware = require("../middlerware/auth")


route.post("/user",userController.createUser)
route.post("/login",userController.loginUser)

route.get("/getInfo/:userId",userController.getDesignDetail)
route.get("/getSpecificDesign/:DesignId",userController.getSpecificDetail)

route.post("/creating",Middleware.authenticate, DesignController.createDesign)
route.get("/reading",DesignController.getDesign)
route.put("/updating/:DesignId",Middleware.authenticate, DesignController.updateDesign)
route.delete("/deleting/:DesignId",Middleware.authenticate, DesignController.DeleteDesign)

module.exports=route;