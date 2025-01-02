import express from "express";;
import registerUser from "../controller/userController/registerUser.js";
import updateUser from "../controller/userController/updateUser.js";
import fetchUserDetails from "../controller/userController/fetchUserDetails.js";
import fetchAllDevices from "../controller/userController/fetchAllDevices.js";
import loginUser from "../controller/userController/loginUser.js";

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login',loginUser);
userRoute.patch("/user/:userId", updateUser);
userRoute.get("/fetchuserData/:userId",fetchUserDetails);
userRoute.get("/fetchAllDevices",fetchAllDevices);
export default userRoute;