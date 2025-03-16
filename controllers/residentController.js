const Visitor = require('../models/Visitor');
const generatePin = require('../utils/pinGenerator');

// Create a visitor pass (frontend will generate QR Code)
exports.createVisitor = async (req, res) => {
    try {
        const { residentId, guestName, startTime, endTime, numberOfUses } = req.body;

        if (!guestName || !startTime || !endTime) {
            return res.status(400).json({ error: 'Guest name, start time, and end time are required' });
        }

        const guestId = `guest_${Date.now()}`;
        const pinCode = generatePin(); // Generate a 4-digit PIN

        const newVisitor = new Visitor({
            guestId,
            residentId,
            guestName,
            startTime,
            endTime,
            numberOfUses,
            pinCode
        });

        await newVisitor.save();

        res.json({ message: 'Visitor access created successfully', guestId, pinCode });
    } catch (error) {
        console.error('Error creating visitor:', error);
        res.status(500).json({ error: 'Failed to create visitor access' });
    }
};

// Delete a visitor pass
exports.deleteVisitor = async (req, res) => {
    try {
        const { guestId } = req.params;

        const visitor = await Visitor.findOneAndDelete({ guestId });

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.json({ message: 'Visitor access revoked successfully' });
    } catch (error) {
        console.error('Error deleting visitor:', error);
        res.status(500).json({ error: 'Failed to revoke visitor access' });
    }
};
