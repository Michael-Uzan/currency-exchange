const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const ObjectId = require('mongodb').ObjectId
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

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}



async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}



function _buildCriteria(userId) {
    let criteria = {}
    // criteria.$or = [{ 'boardMembers._id': userId.userId }, { 'createdBy': null }]
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    save
}
