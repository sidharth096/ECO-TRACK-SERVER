import { userDetails } from "../../queries/userQueries.js";


export default async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cleanUserId = userId.replace(/^:/, '');
        const userData = await userDetails(cleanUserId);
        console.log(userDetails);
        
        res.status(200).json({ message: "User details fetched successfully", user: userData });

    } catch (error) {
        next(error);
    }
}