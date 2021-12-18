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

// GET Boards
async function getTransfers(req, res) {
  try {
    const transfers = await transferService.query()
    res.json(transfers);
  } catch (err) {
    logger.error('Failed to get transfers', err)
    res.status(500).send({ err: 'Failed to get transfers' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const filterBy = req.query;
    let board = await boardService.getById(boardId)
    board = _filterBoard(filterBy, board);
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
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
  addTransfer,
  getTransfers,
  getBoardById,
  removeBoard,
  updateBoard
}