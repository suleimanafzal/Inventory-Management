const { addStore } = require('./store');
const Store = require('../models/store'); // Replace with the actual path


const getAllStores = async (req, res) => {
    try {
        const findAllStores = await Store.find({"userID": req.params.userID});
        const sortedStores = findAllStores.sort((a, b) => b._id - a._id); // Sort in descending order based on _id
        res.json(sortedStores);
    } catch (err) {
        res.status(400).json({ "Success": false, "Message": 'Error fetching stores', err });
    }
};


describe('addStore API', () => {
    it('should add a new store successfully', async () => {
        // Mock request and response objects with sample store data
        const req = {
            body: {
                userId: 'sampleUserId',
                name: 'Sample Store',
                category: 'Sample Category',
                address: 'Sample Address',
                city: 'Sample City',
                image: 'sampleimage.jpg'
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        // Mock the Store model's save method to simulate saving a store
        const storeSaveMock = jest.fn().mockResolvedValue({ _id: 'sampleStoreId', ...req.body }); // Resolving with sample store data
        Store.prototype.save = storeSaveMock;

        // Call the addStore function
        await addStore(req, res);

        // Check if the response status is 200 and if the store data was sent
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ _id: 'sampleStoreId', ...req.body });
    });
});

describe('getAllStores API', () => {
    it('should get all stores for a user successfully', async () => {
        const mockUserID = 'sampleUserId'; // Sample user ID for testing
        
        // Mock request and response objects
        const req = {
            params: {
                userID: mockUserID,
            },
        };

        const res = {
            json: jest.fn(),
        };

        // Mock Store.find to simulate finding stores for the provided userID
        const sampleStores = [{ _id: 'sampleStoreId1', userID: mockUserID, name: 'Store 1' }, { _id: 'sampleStoreId2', userID: mockUserID, name: 'Store 2' }];
        const storeFindMock = jest.fn().mockResolvedValue(sampleStores);
        Store.find = storeFindMock;

        // Call the getAllStores function
        await getAllStores(req, res);

        // Check if the response JSON contains the expected stores
        expect(res.json).toHaveBeenCalledWith(sampleStores);
    });
});