import Device from "../models/devices.model.js";

export default async function calculateMonthlyElectricityCharge(devices) {
  if (!Array.isArray(devices) || devices.length === 0) return 0;

  let totalElectricity = 0;

  for (const device of devices) {
    const { device: deviceId, watts, quantity } = device;

    const deviceDetails = await Device.findById(deviceId);
    if (!deviceDetails) {
      console.error(`Device with ID ${deviceId} not found.`);
      continue;
    }

    const { averageUse } = deviceDetails;

    const dailyUsage = watts * quantity * averageUse;

    totalElectricity += dailyUsage;
  }

  const totalKWh = totalElectricity / 1000;

  const monthlyKWh =Math.floor(totalKWh * 30);

  return monthlyKWh;
}
