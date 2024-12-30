// __tests__/calculateMonthlyElectricityCharge.test.js

import calculateMonthlyElectricityCharge from "../helper/calculateMonthlyElectricityCharge"; // Adjust path to your helper
import Device from "../models/deviceModel"; // Adjust path to your Device model

// Mock the Device model to return test data for device queries
jest.mock("../models/deviceModel");

describe("calculateMonthlyElectricityCharge", () => {
    beforeEach(() => {
        // Reset all mocks before each test to ensure clean state
        Device.findById.mockReset();
    });

    it("should calculate the monthly electricity charge correctly", async () => {
        // Mock data for devices
        const mockDevices = [
            {
                device: "67703c64fae6f69198fdad90", // Device ID
                watts: 50,
                quantity: 2,
            },
            {
                device: "67703c64fae6f69198fdad91", // Device ID
                watts: 100,
                quantity: 1,
            },
        ];

        // Mock the Device model response to simulate averageUse values from the database
        Device.findById.mockImplementation((deviceId) => {
            if (deviceId === "67703c64fae6f69198fdad90") {
                return { averageUse: 8 }; // Fan: 8 hours/day
            } else if (deviceId === "67703c64fae6f69198fdad91") {
                return { averageUse: 6 }; // Light: 6 hours/day
            } else {
                return null; // Simulate that invalid IDs return null
            }
        });

        const ratePerKWh = 5; // Example rate per kWh

        // Call the function to calculate the charge
        const monthlyCharge = await calculateMonthlyElectricityCharge(mockDevices, ratePerKWh);

        // Expected result based on the mock data
        const expectedCharge = (50 * 2 * 8 + 100 * 1 * 6) / 1000 * 30 * ratePerKWh; // Calculation based on the example data

        // Assert that the result is correct
        expect(monthlyCharge).toBe(expectedCharge);
    });

    it("should return 0 if no devices are provided", async () => {
        const monthlyCharge = await calculateMonthlyElectricityCharge([], 5);
        expect(monthlyCharge).toBe(0);
    });

    it("should return 0 if invalid device IDs are provided", async () => {
        // Mock invalid device ID scenario
        Device.findById.mockImplementationOnce(() => null);

        const mockDevices = [
            { device: "invalid_device_id", watts: 50, quantity: 2 },
        ];

        const monthlyCharge = await calculateMonthlyElectricityCharge(mockDevices, 5);
        expect(monthlyCharge).toBe(0);
    });
});
