const boardService = require('./transfer.service.js');
const transferService = require('./transfer.service.js');
const logger = require('../../services/logger.service');

async function addTransfer(req, res) {
  try {
    const transfer = req.body;
    const addedTransfer = await transferService.save(transfer)
    res.send(addedTransfer)
  } catch (err) {
    logger.error('Failed to add transfer', err)
    res.status(500).send({ err: 'Failed to add transfer' })
  }
}

async function getTransfers(req, res) {
  try {
    const transfers = await transferService.query()
    res.json(transfers);
  } catch (err) {
    logger.error('Failed to get transfers', err)
    res.status(500).send({ err: 'Failed to get transfers' })
  }
}

module.exports = {
  addTransfer,
  getTransfers,
}