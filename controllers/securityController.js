const Visitor = require('../models/Visitor');

// Validate guest access using PIN
exports.validateUser = async (req, res) => {
    try {
        const { guestId, pinCode } = req.body;

        const visitor = await Visitor.findOne({ guestId, pinCode });

        if (!visitor) {
            return res.status(403).json({ message: 'Access Denied: Invalid PIN' });
        }

        res.json({ message: 'Access Granted', guestId, guestName: visitor.guestName });
    } catch (error) {
        console.error('Error validating user:', error);
        res.status(500).json({ error: 'Failed to validate user' });
    }
};
