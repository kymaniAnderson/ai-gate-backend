const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    guestId: { type: String, required: true, unique: true },
    residentId: { type: String, required: true },
    guestName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    numberOfUses: { type: Number, default: 1 },
    pinCode: { type: String, required: true }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
