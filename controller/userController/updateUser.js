import { updateUser } from "../../queries/userQueries.js";
import calculateAverageElectricity from "../../helper/calculateAverageElectricity.js";  // Helper to calculate electricity
import calculateAverageWater from "../../helper/calculateAverageWater.js";  // Helper to calculate water
import { updateUsageAverage } from "../../queries/usageAverageQuery.js";

export default async (req, res, next) => {
    const { userId } = req.params; // Get the userId from the URL parameters
    const updateData = req.body;   // Get the data to update from the request body

    try {
        // Validate if the updateData has something to update (you can add more checks as needed)
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided to update" });
        }

        // If the devices or family members data is updated, recalculate the usage averages
        let averageElectricity = 0;
        let averageWater = 0;

        if (updateData.devices) {
            // Recalculate average electricity usage if devices are updated
            averageElectricity = calculateAverageElectricity(updateData.devices);
        }

        if (updateData.familyMembers) {
            // Recalculate average water usage if family members are updated
            averageWater = calculateAverageWater(updateData.familyMembers);
        }

        // Update user in the database
        const updatedUser = await updateUser(userId, updateData);

        // If user not found, return error
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // If usage averages exist, update them in the database
        if (averageElectricity || averageWater) {
            const newUsageAverage = await updateUsageAverage(userId, {
                electricity: averageElectricity,
                water: averageWater
            });

            // If updating usage averages fails
            if (!newUsageAverage) {
                return res.status(500).json({ message: "Failed to update usage averages" });
            }
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};
