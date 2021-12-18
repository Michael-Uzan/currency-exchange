const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const TRANSFER_COLLECTION = 'transfer'

async function save(transfer) {
    try {
        const collection = await dbService.getCollection(TRANSFER_COLLECTION)
        await collection.insertOne(transfer)
        return transfer
    } catch (err) {
        logger.error('cannot add transfer', err)
        throw err
    }
}

async function query() {
    try {
        const criteria = _buildCriteria()
        const collection = await dbService.getCollection(TRANSFER_COLLECTION)
        const transfers = await collection.find(criteria).toArray()
        transfers.splice(5)
        return transfers
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

function _buildCriteria(userId) {
    let criteria = {}
    return criteria;
}

module.exports = {
    query,
    save
}
