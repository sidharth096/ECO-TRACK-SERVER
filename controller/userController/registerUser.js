import calculateAverageElectricity from "../../helper/calculateAverageElectricity.js";
import calculateAverageWater from "../../helper/calculateAverageWater.js";
import { createUsageAverage } from "../../queries/usageAverageQuery.js";
import { createUser } from "../../queries/userQueries.js";

export default async (req, res, next) => {
    try {
        console.log("1111",req.body);
        
        const { email, password, devices, rationCard, familyMembers } = req.body;

        // Validate input
        if (!email || !password || !rationCard) {
            return res.status(400).json({ message: "Email, password, and ration card are required" });
        }


        // Save the user
        const newUser = await createUser({ email, password, devices, rationCard ,familyMembers });

        
        // Calculate average electricity and water usage
        const averageElectricity = await calculateAverageElectricity(devices); // Pass devices to calculate electricity
        const averageWater =  calculateAverageWater(familyMembers); // Pass familyMembers to calculate water

        // Save usage averages after user creation
        const newUsageAverage = await createUsageAverage({
            userId: newUser._id,
            electricity: averageElectricity,
            water: averageWater
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            usageAverage: newUsageAverage
        });  
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: error.message});
    }
};
