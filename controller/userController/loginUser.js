import { fetchUsageAverage } from "../../queries/usageAverageQuery.js";
import { findUserByEmail } from "../../queries/userQueries.js";

export default async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await findUserByEmail(email);
        

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const usageAverage = await fetchUsageAverage(user._id);
        console.log(usageAverage);
        

        res.status(200).json({ message: "Login successful", user , usageAverage});

    } catch (error) {
        next(error);
    }
}