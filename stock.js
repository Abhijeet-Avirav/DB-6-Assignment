let stocks = [
  { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
  { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.1 },
  { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.5 },
];

async function getAllStocks() {
  return stocks;
}

function getStockByTicker(ticker) {
  return stocks.find((stock) => stock.ticker.trim() === ticker.trim());
}

module.exports = {
  getAllStocks,
  getStockByTicker,
};
