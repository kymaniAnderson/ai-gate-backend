const mongoose = require('mongoose');

const ResidentSchema = new mongoose.Schema({
    residentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    unitNumber: { type: String, required: true }
});

module.exports = mongoose.model('Resident', ResidentSchema);
