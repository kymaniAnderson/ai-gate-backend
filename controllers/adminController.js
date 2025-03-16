const Resident = require('../models/Resident');
const Visitor = require('../models/Visitor');
const SecurityLog = require('../models/SecurityLog');

// Get all residents
exports.getResidents = async (req, res) => {
    try {
        const residents = await Resident.find();
        res.json({ residents });
    } catch (error) {
        console.error('Error fetching residents:', error);
        res.status(500).json({ error: 'Failed to fetch residents' });
    }
};

// Get all active visitors
exports.getActiveVisitors = async (req, res) => {
    try {
        const activeVisitors = await Visitor.find({ exitTime: null }); // Only visitors who haven't checked out
        res.json({ activeVisitors });
    } catch (error) {
        console.error('Error fetching active visitors:', error);
        res.status(500).json({ error: 'Failed to fetch active visitors' });
    }
};

// Get all security logs
exports.getLogs = async (req, res) => {
    try {
        const logs = await SecurityLog.find().sort({ timestamp: -1 }); // Sort logs by latest
        res.json({ logs });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

// Delete a resident
exports.deleteResident = async (req, res) => {
    try {
        const { residentId } = req.params;
        await Resident.findOneAndDelete({ residentId });
        res.json({ message: 'Resident deleted successfully' });
    } catch (error) {
        console.error('Error deleting resident:', error);
        res.status(500).json({ error: 'Failed to delete resident' });
    }
};
