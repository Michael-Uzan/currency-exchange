const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { addTransfer, getTransfers } = require('./transfer.controller')
const router = express.Router();


router.post('/', requireAuth, addTransfer)
router.get('/', log, getTransfers);

module.exports = router;