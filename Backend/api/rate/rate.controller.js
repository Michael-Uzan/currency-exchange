const rateService = require('./rate.service.js');
const boardService = require('./rate.service.js');
const logger = require('../../services/logger.service');

// Define 5% of commission for every transition :
const commissionPrecent = 0.05

// GET Boards
async function getBoards(req, res) {
  try {
    var userId = req.query;
    const boards = await boardService.query(userId)
    res.json(boards);
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getRate(req, res) {
  try {
    const srcCoin = req.params.srcCoin;
    const desCoin = req.params.desCoin;
    // const filterBy = req.query;
    // let board = await boardService.getById(boardId)
    const srcRate = await rateService.getByCurrency(srcCoin)
    const desRate = await rateService.getByCurrency(desCoin)
    const rate = _calculateExchangeRate(srcRate, desRate)
    // console.log('after service', srcRate, desRate)
    // board = _filterBoard(filterBy, board);
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

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body;
    const addedBoard = await boardService.save(board)
    res.send(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// DELETE BOARD
async function removeBoard(req, res) {
  try {
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body
    let savedBoard = await boardService.save(board)
    res.send(savedBoard)
  } catch (err) {
    console.log(err)
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })
  }
}

function _filterBoard(filterBy, board) {
  const newFilterBy = JSON.parse(filterBy.filterBy)
  const filteredBoard = JSON.parse(JSON.stringify(board))

  if (!newFilterBy.isFilter) return board

  filteredBoard.lists.forEach(list => {
    list.cards = list.cards.filter(card => {
      const regex = new RegExp(newFilterBy.searchKey, 'i');

      let isMemberOnCard = true
      let isLabelsOnCard = true

      if (newFilterBy.members.length) {
        isMemberOnCard = newFilterBy.members.some(filterMember => card.cardMembers.some(cardMember => filterMember === cardMember._id))
      }

      if (newFilterBy.labels.length) {
        isLabelsOnCard = newFilterBy.labels.some(filterLabel => card.cardLabelIds.some(cardLabel => filterLabel === cardLabel))
      }

      const isTxtOnCard = regex.test(card.cardTitle)

      return isTxtOnCard && isMemberOnCard && isLabelsOnCard
    })
    filteredBoard.cardsCount += list.cards.reduce((acc, card) => {
      acc++
      return acc;
    }, 0)
  })
  return filteredBoard
}

module.exports = {
  getRate,
  getBoards,
  // getBoardById,
  addBoard,
  removeBoard,
  updateBoard
}