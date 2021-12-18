const rateService = require('./rate.service.js');
const boardService = require('./rate.service.js');
const logger = require('../../services/logger.service');

// Define 5% of commission for every transition :
const commissionPrecent = 0.05

async function getRates(req, res) {
  try {
    const rates = await rateService.query()
    res.json(rates);
  } catch (err) {
    logger.error('Failed to get rates', err)
    res.status(500).send({ err: 'Failed to get rates' })
  }
}

async function getRate(req, res) {
  try {
    const srcCoin = req.params.srcCoin;
    const desCoin = req.params.desCoin;
    const srcRate = await rateService.getByCurrency(srcCoin)
    const desRate = await rateService.getByCurrency(desCoin)
    const rate = _calculateExchangeRate(srcRate, desRate)
    res.json(rate)
  } catch (err) {
    logger.error('Failed to get rate', err)
    res.status(500).send({ err: 'Failed to get rate' })
  }
}

function _calculateExchangeRate(srcRate, desRate) {
  const originalRate = srcRate.rateToDollar * desRate.dollarToCurrency
  const commissionExtra = originalRate * commissionPrecent
  return (originalRate - commissionExtra).toFixed()
}

module.exports = {
  getRate,
  getRates,
}