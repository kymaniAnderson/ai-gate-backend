const mongoose = require('mongoose');

const SecurityLogSchema = new mongoose.Schema({
    logId: { type: String, required: true, unique: true },
    guestId: { type: String, required: true },
    guestName: { type: String, required: true },
    accessMethod: { type: String, enum: ['QR Code', 'PIN', 'Manual'], required: true },
    status: { type: String, enum: ['Granted', 'Denied'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SecurityLog', SecurityLogSchema);
