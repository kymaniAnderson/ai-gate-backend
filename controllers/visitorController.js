const Visitor = require('../models/Visitor');

// Get visitor details (PIN, start/end time)
exports.getVisitorCode = async (req, res) => {
    try {
        const { guestId } = req.params;

        const visitor = await Visitor.findOne({ guestId });

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.json({
            guestId: visitor.guestId,
            guestName: visitor.guestName,
            startTime: visitor.startTime,
            endTime: visitor.endTime,
            numberOfUses: visitor.numberOfUses,
            pinCode: visitor.pinCode // Frontend generates QR code from this data
        });
    } catch (error) {
        console.error('Error fetching visitor details:', error);
        res.status(500).json({ error: 'Failed to fetch visitor details' });
    }
};
