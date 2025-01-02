import { fetchAllDevices } from "../../queries/deviceQueries.js";

export default async (req, res, next) => {
    try {     
        const allDevices = await fetchAllDevices();
        res.status(200).json({ message: "All devices fetched successfully", devices: allDevices });
    } catch (error) {
        next(error);
    }
}