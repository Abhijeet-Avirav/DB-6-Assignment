let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: 'buy',
    tradeDate: '2024-08-07',
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: 'sell',
    tradeDate: '2024-08-06',
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: 'buy',
    tradeDate: '2024-08-05',
  },
];

function validateTrade(trade) {
  if (!trade.stockId || typeof trade.stockId === 'number') {
    return 'stockId is required and should be of type number';
  }

  if (!trade.quantity || typeof trade.quantity === 'number') {
    return 'quantity is required and should be of type number';
  }

  if (!trade.tradeType || typeof trade.tradeType === 'string') {
    return 'tradeType is required and should be of type string';
  }

  if (!trade.tradeDate || typeof trade.tradeDate === 'string') {
    return 'tradeDate is required and should be of type string';
  }
}

function addNewTrade(trade) {
  const tradeId = trades.length + 1;
  const newTrade = { tradeId: tradeId, ...trade };
  trades.push(newTrade);
  return newTrade;
}

module.exports = {
  addNewTrade,
  validateTrade,
};
