const express = require('express');
const { getAllStocks, getStockByTicker } = require('./stock');
const { addNewTrade, validateTrade } = require('./trade');
const app = express();
app.use(express.json());

app.get('/stocks', async (req, res) => {
  const stocks = await getAllStocks();
  return res.status(200).json({ stocks });
});

app.get('/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker;
  const stock = getStockByTicker(ticker);
  if (!stock) {
    return res.status(404).json({ message: 'Stock not found' });
  }
  return res.status(200).json({
    stock,
  });
});

app.post('/trades/new', (req, res) => {
  const trade = req.body;
  const validationResponse = validateTrade(trade);
  if (validationResponse) {
    return res.status(400).json({ message: validationResponse });
  }
  const newTrade = addNewTrade(trade);
  return res.status(201).json({
    trade: newTrade,
  });
});

module.exports = {
  app,
};
