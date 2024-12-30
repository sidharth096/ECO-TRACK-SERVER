import express from "express";
import addDevice from "../controller/adminConroller/addDevice.js";

const adminRoute = express.Router();

adminRoute.post ('/addDevice',addDevice);

export default adminRoute;