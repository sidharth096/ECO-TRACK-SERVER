import Device from "../models/devices.model.js";

export default async function calculateMonthlyElectricityCharge(devices, ratePerKWh = 5) {
    if (!Array.isArray(devices) || devices.length === 0) return 0;

    let totalElectricity = 0;

    for (const device of devices) {
        const { device: deviceId, watts, quantity } = device;

        // Fetch the device details from the database
        const deviceDetails = await Device.findById(deviceId);
        if (!deviceDetails) {
            console.error(`Device with ID ${deviceId} not found.`);
            continue; // Skip if device is not found
        }

        const { averageUse } = deviceDetails; // Average daily hours of use

        // Calculate daily electricity usage for this device (in watt-hours)
        const dailyUsage = watts * quantity * averageUse;

        // Add daily usage to total electricity usage (in watt-hours)
        totalElectricity += dailyUsage;
    }

    // Convert total watt-hours to kilowatt-hours (1 kWh = 1000 watt-hours)
    const totalKWh = totalElectricity / 1000;

    // Calculate monthly electricity usage (multiply by 30 days for 30-day month)
    const monthlyKWh = totalKWh * 30;

    // Calculate the monthly electricity charge based on the rate per kWh
    const monthlyCharge = monthlyKWh * ratePerKWh;

    return monthlyCharge; // Total monthly electricity charge in your currency
}
