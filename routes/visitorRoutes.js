const express = require('express');
const router = express.Router();
const { getVisitorCode } = require('../controllers/visitorController');

router.get('/getCode/:guestId', getVisitorCode);

module.exports = router;
