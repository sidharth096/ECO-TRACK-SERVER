import User from "../models/user.model.js";

// Create a new user with all details
export const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Check if the email already exists
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};
