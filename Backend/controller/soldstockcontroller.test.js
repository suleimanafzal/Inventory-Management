const { soldStock } = require('./soldStock');
const { Product } = require('../models/Product');


jest.mock('../models/Product', () => ({
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  }));
  
  describe('soldStock function', () => {
    it('should update the sold stock for a product', async () => {
      const mockProductData = { _id: 'sampleProductID', stock: 10 };
  
      Product.findOne.mockResolvedValue(mockProductData);
      Product.findByIdAndUpdate.mockResolvedValue({ _id: 'sampleProductID', stock: 5 });
  
      const updatedStock = await soldStock('sampleProductID', 5);
  
      expect(Product.findOne).toHaveBeenCalledWith({ _id: 'sampleProductID' });
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: 'sampleProductID' },
        { stock: 5 },
        { new: true }
      );
      expect(updatedStock).toEqual({ _id: 'sampleProductID', stock: 5 });
    });
  });