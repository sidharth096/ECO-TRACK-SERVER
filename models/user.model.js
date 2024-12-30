import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    devices: [
        {
            device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
            watts: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    familyMembers: [
        {
            name: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
                min: [0, "Age must be a positive number"],
            },
        }
    ],
    rationCard: {
        type: String,
        enum: {
            values: ["APL", "BPL"],
            message: "{VALUE} is not a valid ration card type"
        },
        required: [true, "Please provide a ration card type"]
    }

});

const User = mongoose.model("User", userSchema);
export default User;
