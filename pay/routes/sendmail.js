const express = require('express');
const passwordSend = require('../ctrlr/mail');
const router = express.Router();

router.route('/send')
.post(passwordSend);

module.exports = router;
