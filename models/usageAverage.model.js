import mongoose from "mongoose";

const usageAverageSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    electricity: {
        type: Number,
        required: false
    },
    water: {
        type: Number,
        required: false
    }

});

const UsageAverage = mongoose.model("UsageAverage", usageAverageSchema);
export default UsageAverage;