const { Login } = require('./userController');
const { Signup } = require('./userController');

describe('Login API', () => {
    it('should log in a user successfully', async () => {
        // Mock request and response objects
        const req = {
            body: {
                email: 'test@example.com',
                password: 'testPassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking the User.findOne method to simulate finding a user
        const foundUser = { 
            email: 'test@example.com',
            password: '$2b$10$FakeHashValueFakeHashValueFakeHashVa', // Mocked hashed password value
            _id: 'sampleUserId',
            role: 'user',
        };
        const User = require('../models/User'); // Replace with the actual path
        jest.spyOn(User, 'findOne').mockResolvedValue(foundUser);

        // Mocking bcrypt.compare to simulate password comparison
        const bcrypt = require('bcrypt'); // Replace with the actual bcrypt import
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        // Mocking jwt.sign method
        const jwt = require('jsonwebtoken'); // Replace with the actual jwt import
        jest.spyOn(jwt, 'sign').mockReturnValue('sampleToken');

        // Call the Login function
        await Login(req, res);

        // Check if the response status is 200 and the success message is sent
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ "Success": true, user: foundUser, token: 'sampleToken', 'Message': 'User logged in successfully' });
    });
});

describe('Signup API', () => {
    it('should add a new user successfully', async () => {
        // Mock request and response objects
        const req = {
            body: {
                email: 'test@example.com',
                password: 'testPassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking the User model's save method to simulate saving a user
        const User = require('../models/User'); // Replace with the actual path
        const userSaveMock = jest.fn().mockResolvedValue(); // Resolving without value to simulate successful save
        jest.spyOn(User.prototype, 'save').mockImplementation(userSaveMock);

        // Call the Signup function
        await Signup(req, res);

        // Check if the response status is 200 and the success message is sent
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ "Success": true, 'Message': 'User added successfully' });
    });
});
