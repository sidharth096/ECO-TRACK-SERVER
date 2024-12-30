import { addNewDevice } from "../../queries/deviceQueries.js";

export default async (req, res, next) => {
    const { name, averageUse } = req.body;

    try {
        // Validate input
        if (!name || !averageUse) {
            return res.status(400).json({ message: "All fields are required: name and averageUse" });
        }

        // Add the new device
        const newDevice = await addNewDevice({ name, averageUse });

        res.status(201).json({ message: "Device added successfully", device: newDevice });
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Device with this name already exists" });
        }
        next(error);
    }
}