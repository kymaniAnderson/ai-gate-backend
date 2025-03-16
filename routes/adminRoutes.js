const express = require('express');
const router = express.Router();
const { getResidents, getActiveVisitors, getLogs, deleteResident } = require('../controllers/adminController');

router.get('/getresidents', getResidents);
router.get('/getactivevisitors', getActiveVisitors);
router.get('/getlogs', getLogs);
router.delete('/deleteresidents/:residentId', deleteResident);

module.exports = router;
