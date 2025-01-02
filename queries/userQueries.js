import User from "../models/user.model.js";
import mongoose from "mongoose";

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

export const  userDetails = async (userId) => {
    // Input validation
    
    if (!userId || typeof userId !== 'string' || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId provided');
    }

    try {
        const result = await User.aggregate([
            {
                $match: { 
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "usageaverages",
                    localField: "_id",
                    foreignField: "userId",
                    as: "usageData"
                }
            },
            {
                $unwind: {
                    path: "$usageData",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Add additional fields and calculations
            {
                $addFields: {
                    "lastActiveDate": "$usageData.lastActiveDate",
                    "totalUsageHours": { $round: ["$usageData.totalUsageHours", 2] },
                    "averageDailyUsage": { 
                        $round: [{ 
                            $divide: ["$usageData.totalUsageHours", "$usageData.daysTracked"] 
                        }, 2]
                    }
                }
            },
            // Project only needed fields
            {
                $project: {
                    _id: 1,
                    email: 1,
                    name: 1,
                    lastActiveDate: 1,
                    totalUsageHours: 1,
                    averageDailyUsage: 1,
                    usageData: 1
                }
            }
        ]);

        // Handle case where no user is found
        if (!result || result.length === 0) {
            throw new Error(`No user found with ID: ${userId}`);
        }

        // Since we're querying by _id, we expect only one result
        return result[0];

    } catch (error) {
        console.error("Error in userDetails aggregation:", error);
        
        // Enhance error message based on error type
        if (error.name === 'MongoServerError') {
            throw new Error(`Database error: ${error.message}`);
        } else if (error.message.includes('No user found')) {
            throw new Error(error.message);
        } else {
            throw new Error('Failed to fetch user details');
        }
    }
};
