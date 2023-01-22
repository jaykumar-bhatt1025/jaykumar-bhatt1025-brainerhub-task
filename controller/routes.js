const express = require('express');

const router = express.Router();
const controller = require('./controller');

router.get('/',controller.getFrom);
router.post('/',controller.submitFrom);

module.exports = router;