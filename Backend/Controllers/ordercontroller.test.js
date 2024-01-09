const { addOrder } = require('./orderController');


describe('Add Order API', () => {
    it('should add a new order successfully', async () => {
        // Define mock request and response objects
        const req = {
            body: {
                items: ['item1', 'item2'],
            },
            decoded: { _id: 'sampleUserID' },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the addOrder function
        await addOrder(req, res);

        // Check if the response status is 200 and contains the success message
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ "Success": true, 'Message': 'Order added successfully' });
    });
});
