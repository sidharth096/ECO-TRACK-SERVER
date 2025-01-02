import Device from "../models/devices.model.js";

export const addNewDevice = async (deviceData) => {
    const newDevice = new Device(deviceData);
    return await newDevice.save();
};

export const fetchAllDevices = async () => {
    return await Device.find();
};  