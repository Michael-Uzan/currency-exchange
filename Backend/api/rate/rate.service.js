const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const RATE_COLLECTION = 'rates'

async function query() {
    try {
        const criteria = _buildCriteria()
        const collection = await dbService.getCollection(RATE_COLLECTION)
        const rates = await collection.find(criteria).toArray()
        return rates
    } catch (err) {
        logger.error('cannot find rates', err)
        throw err
    }
}

async function getByCurrency(currencyName) {
    try {
        const collection = await dbService.getCollection(RATE_COLLECTION)
        const rateToDollar = collection.findOne({ 'currency': currencyName })
        return rateToDollar
    } catch (err) {
        logger.error(`while finding currency ${currencyName}`, err)
        throw err
    }
}

function _buildCriteria() {
    let criteria = {}
    return criteria;
}

module.exports = {
    query,
    getByCurrency
}
