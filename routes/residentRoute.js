const express = require('express');
const { createVisitor, deleteVisitor } = require('../controllers/residentController');

const router = express.Router();

// Resident API Routes
router.post('/createvisitor', createVisitor);
router.delete('/deletevisitor/:guestId', deleteVisitor);

module.exports = router;
