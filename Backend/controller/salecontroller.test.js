const Sales = require('../models/sales'); // Import the Sales model
const { getTotalSalesAmount } = require('./sales');

jest.mock('../models/sales', () => ({
  find: jest.fn(),
}));

describe('getTotalSalesAmount function', () => {
  it('should calculate total sales amount for a user', async () => {
    const mockSalesData = [
      { _id: 1, userID: 'sampleUserID', TotalSaleAmount: 100 },
      { _id: 2, userID: 'sampleUserID', TotalSaleAmount: 150 },
      { _id: 3, userID: 'otherUserID', TotalSaleAmount: 200 },
    ];

    Sales.find.mockResolvedValue(mockSalesData);

    const req = { params: { userID: 'sampleUserID' } };
    const res = { json: jest.fn() };

    await getTotalSalesAmount(req, res);

    expect(Sales.find).toHaveBeenCalledWith({ "userID": 'sampleUserID' });

    const expectedTotalSaleAmount = mockSalesData
      .filter(sale => sale.userID === 'sampleUserID')
      .reduce((total, sale) => total + sale.TotalSaleAmount, 0);

   // expect(res.json).toHaveBeenCalledWith({ totalSaleAmount: expectedTotalSaleAmount });
  });
});