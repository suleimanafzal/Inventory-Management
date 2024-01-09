const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const productController = require('./product.js');
const Product = require('../models/Product.js');

const app = express();

mongoose.connect('mongodb+srv://suleiman:hellodb@cluster0.si6r4lg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setup routes
app.post('/api/products', productController.addProduct);
app.get('/api/products/:userId', productController.getAllProducts);
app.delete('/api/products/:id', productController.deleteSelectedProduct);
app.put('/api/products/update', productController.updateSelectedProduct);
app.get('/api/products/search', productController.searchProduct);

// Tests
describe('Product Controller', () => {
  beforeAll(async () => {
    await Product.deleteMany(); // Clear the test database before running tests
  }, 10000);

  afterAll(async () => {
    await mongoose.disconnect(); // Close the MongoDB connection after all tests
  }, 10000);

  it('should add a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        userId: 'someUserId',
        name: 'Test Product',
        manufacturer: 'Test Manufacturer',
        description: 'Test Description',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    const response = await request(app).get('/api/products/someUserId');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Assuming the product added in the previous test is retrieved
  });

  it('should delete a product and related purchases/sales', async () => {
    // Assuming there is a product to delete, you may add a product first before running this test
    const addedProduct = await Product.create({
      userId: 'someUserId',
      name: 'Product to Delete',
      manufacturer: 'Test Manufacturer',
      description: 'Test Description',
    });

    const response = await request(app).delete(`/api/products/${addedProduct._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('deleteProduct');
    expect(response.body).toHaveProperty('deletePurchaseProduct');
    expect(response.body).toHaveProperty('deleteSaleProduct');
  });

  it('should update a product', async () => {
    const addedProduct = await Product.create({
      userId: 'someUserId',
      name: 'Product to Update',
      manufacturer: 'Test Manufacturer',
      description: 'Test Description',
    });

    const response = await request(app)
      .put('/api/products/update')
      .send({
        productID: addedProduct._id,
        name: 'Updated Product Name',
        manufacturer: 'Updated Manufacturer',
        description: 'Updated Description',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Product Name');
  });

  it('should search for products', async () => {
    // Assuming there are products in the database, you may add products first before running this test
    const response = await request(app).get('/api/products/search?searchTerm=Test');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Assuming there are two products with 'Test' in the name
  });
});
