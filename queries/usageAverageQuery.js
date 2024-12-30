import UsageAverage from "../models/usageAverage.model.js";

export const createUsageAverage = async (usageAverageData) => {
    const newUsageAverage = new UsageAverage(usageAverageData);
    return await newUsageAverage.save();
};

export const updateUsageAverage = async (userId, updateData) => {
    return await UsageAverage.findOneAndUpdate({ userId }, updateData, { new: true });
};