const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getRate, getRates } = require('./rate.controller')
const router = express.Router();


router.get('/:srcCoin/:desCoin', getRate)
router.get('/', getRates);

module.exports = router;