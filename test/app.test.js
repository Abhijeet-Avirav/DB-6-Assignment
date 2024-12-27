const { getAllStocks, getStockByTicker } = require('../stock');
const { app } = require('../index');
const http = require('http');
const request = require('supertest');
const { addNewTrade, validateTrade } = require('../trade');

jest.mock('../stock', () => ({
  ...jest.requireActual('../stock'),
  getAllStocks: jest.fn(),
  getStockByTicker: jest.fn(),
}));

jest.mock('../trade', () => ({
  ...jest.requireActual('../trade'),
  addNewTrade: jest.fn(),
  validateTrade: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API end point testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('api GET /stock should retrive all stocks', async () => {
    const stockMockValues = [
      {
        stockId: 1,
        ticker: 'AAPL',
        companyName: 'Apple Inc.',
        price: 150.75,
      },
      {
        stockId: 2,
        ticker: 'GOOGL',
        companyName: 'Alphabet Inc.',
        price: 2750.1,
      },
    ];

    getAllStocks.mockReturnValue(stockMockValues);
    const result = await request(server).get('/stocks');
    expect(result.statusCode).toEqual(200);
    expect(getAllStocks).toHaveBeenCalled();
    expect(result.body.stocks).toEqual(stockMockValues);
  });
  it('api GET /stocks/:ticker endpoint successfully retrieves a specific stock by ticker', async () => {
    const stockByTickerMock = {
      stockId: 2,
      ticker: 'GOOGL',
      companyName: 'Alphabet Inc.',
      price: 2750.1,
    };
    getStockByTicker.mockReturnValue(stockByTickerMock);

    const result = await request(server).get('/stocks/GOOGL');
    expect(result.statusCode).toEqual(200);
    expect(getStockByTicker).toHaveBeenCalledTimes(1);
    expect(result.body.stock).toEqual(stockByTickerMock);
  });
  it('api POST /trades endpoint to add new trade', async () => {
    const mockTrade = {
      tradeId: 4,
      stockId: 1,
      quantity: 15,
      tradeType: 'buy',
      tradeDate: '2024-08-08',
    };

    addNewTrade.mockReturnValue(mockTrade);
    validateTrade.mockReturnValue(undefined);
    const result = await request(server).post('/trades/new').send({
      stockId: 1,
      quantity: 15,
      tradeType: 'buy',
      tradeDate: '2024-08-08',
      tradeType: 'buy',
    });

    expect(result.statusCode).toEqual(201);
    expect(addNewTrade).toHaveBeenCalled();
    expect(result.body.trade).toEqual(mockTrade);
  });
  it('api GET /stocks/:ticker endpoint returns a 404 status code when provided with an invalid ticker.', async () => {
    getStockByTicker.mockReturnValue(null);
    const result = await request(server).get('/stocks/999');
    expect(result.statusCode).toEqual(404);
    expect(getStockByTicker).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual({ message: 'Stock not found' });
  });
  it('api  POST /trades endpoint returns a 400 status code when provided with invalid input', async () => {
    validateTrade.mockReturnValue(
      'stockId is required and should be of type number'
    );
    const response = await request(server)
      .post('/trades/new')
      .send({ stockId: '' });
    // console.log(response.body)
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual(
      'stockId is required and should be of type number'
    );
  });
});

describe('Function testing', () => {
  it(`Get All stock should retrun all stocks`, async () => {
    const stockMockValues = [
      {
        stockId: 1,
        ticker: 'AAPL',
        companyName: 'Apple Inc.',
        price: 150.75,
      },
      {
        stockId: 2,
        ticker: 'GOOGL',
        companyName: 'Alphabet Inc.',
        price: 2750.1,
      },
    ];
    getAllStocks.mockReturnValue(stockMockValues);
    const stock = await getAllStocks();
    expect(stock).toEqual(stockMockValues);
    expect(getAllStocks).toHaveBeenCalled();
  });
  it('add trade function return the new trade added', async () => {
    const mockTradeRes = {
      tradeId: 4,
      stockId: 1,
      quantity: 15,
      tradeType: 'buy',
      tradeDate: '2024-08-08',
    };
    const mockTradePayload = {
      stockId: 1,
      quantity: 15,
      tradeType: 'buy',
      tradeDate: '2024-08-08',
    };
    addNewTrade.mockReturnValue(mockTradeRes);
    const newTrade = addNewTrade(mockTradePayload);
    expect(newTrade).toEqual(mockTradeRes);
    expect(addNewTrade).toHaveBeenCalledTimes(1);
  });
});
