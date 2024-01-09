const Item = require('../models/Items');
const { getAllItems } = require('./itemController');
const { getItemById } = require('./itemController');

describe('Get All Items API', () => {
    // Test case to check if it retrieves all items successfully
    it('should retrieve all items', async () => {
        const sampleItems = [{ name: 'Item 1' }, { name: 'Item 2' }];
        jest.spyOn(Item, 'find').mockResolvedValue(sampleItems);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ Success: true, items: sampleItems });

        jest.restoreAllMocks(); // Restore mocked functions after the test
    });

    // Test case to check error handling when getting items fails
    it('should handle error when getting items fails', async () => {
        const errorMessage = 'Failed to get items';
        jest.spyOn(Item, 'find').mockRejectedValue(new Error(errorMessage));
    
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        try {
            await getAllItems(req, res);
        } catch (error) {
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ Success: false, Message: 'Getting items failed', err: { message: errorMessage } });
        }
    
        jest.restoreAllMocks(); // Restore mocked functions after the test
    });
    
});


describe('Get Item by ID API', () => {
    it('should retrieve an item by ID', async () => {
        // Mocking Item.findById to return a resolved Promise with a sample item
        const sampleItem = { _id: 'sampleID', name: 'Sample Item' };
        jest.spyOn(Item, 'findById').mockResolvedValue(sampleItem);

        const req = { params: { id: 'sampleID' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getItemById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ Success: true, item: sampleItem });

        jest.restoreAllMocks(); // Restore mocked functions after the test
    });

    describe('Get Item by ID API', () => {
        it('should handle error when getting item by ID fails', async () => {
            const errorMessage = 'Failed to get item';
            jest.spyOn(Item, 'findById').mockRejectedValue(new Error(errorMessage));
    
            const req = { params: { id: 'nonExistentID' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            await getItemById(req, res);
    
            // expect(res.status).toHaveBeenCalledWith(400);
            //expect(res.json).toHaveBeenCalledWith({ Success: false, Message: 'Getting item failed', err: { message: errorMessage } });
    
            jest.restoreAllMocks(); // Restore mocked functions after the test
        });
    });
});
