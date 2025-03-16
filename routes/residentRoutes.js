const express = require('express');
const router = express.Router();
const { createVisitor, deleteVisitor } = require('../controllers/residentController');

router.post('/createvisitor', createVisitor);
router.delete('/deletevisitor/:guestId', deleteVisitor);

module.exports = router;
