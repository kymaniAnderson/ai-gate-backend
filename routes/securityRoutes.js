const express = require('express');
const router = express.Router();
const { validateUser } = require('../controllers/securityController');

router.post('/validateuser', validateUser);

module.exports = router;
