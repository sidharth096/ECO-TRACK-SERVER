import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true
    },
    averageUse: {
        type: Number,
        required: [true, "Please provide the average usage"],
        min: [0, "Usage cannot be negative"]
    }
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
