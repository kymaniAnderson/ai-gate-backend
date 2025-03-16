const Resident = require('../models/Resident');
const Visitor = require('../models/Visitor');
const SecurityLog = require('../models/SecurityLog');
const { OpenAI } = require('openai');
require('dotenv').config();

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


// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Generate AI Incident Report
exports.generateIncidentReport = async (req, res) => {
    try {
        const { startTime, endTime } = req.body;

        if (!startTime || !endTime) {
            return res.status(400).json({ error: 'Start time and end time are required' });
        }

        // Fetch visitors who were present during the time window
        const visitors = await Visitor.find({
            startTime: { $lte: new Date(endTime) },
            endTime: { $gte: new Date(startTime) }
        });

        if (visitors.length === 0) {
            return res.json({ message: 'No visitors found during the specified time.' });
        }

        // Format visitor data for AI
        const visitorDetails = visitors.map(visitor => 
            `${visitor.guestName} (PIN: ${visitor.pinCode}) was visiting resident ID ${visitor.residentId} from ${visitor.startTime} to ${visitor.endTime}.`
        ).join("\n");

        // AI Prompt
        const prompt = `
            Generate a detailed security incident report for the given visitor activity:
            ${visitorDetails}
            
            Highlight any unusual patterns or suspicious behavior.
        `;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "You are a security analysis AI." }, { role: "user", content: prompt }],
            max_tokens: 500
        });

        const report = response.choices[0].message.content;

        res.json({ report });

    } catch (error) {
        console.error('Error generating incident report:', error);
        res.status(500).json({ error: 'Failed to generate incident report' });
    }
};

