import express from "express";  
import dotenv from "dotenv";

import { connectDB } from "./config/db.config.js";
import router from "./router/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    console.log("Hello from the server!");
    
    res.send("Hello from the server!");
})

app.use("/",router)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
    res.send("Hello from the server!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}); 
