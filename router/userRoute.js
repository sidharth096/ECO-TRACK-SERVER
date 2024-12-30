import express from "express";;
import registerUser from "../controller/userController/registerUser.js";
import updateUser from "../controller/userController/updateUser.js";

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.patch("/user/:userId", updateUser);

export default userRoute;