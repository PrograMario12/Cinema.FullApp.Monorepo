const authController = require('../../controllers/authController');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

// Mock User model and jwt
jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller - Register', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
        };
        const createdUser = {
            _id: 'user_id_123',
            email: 'test@example.com',
        };
        const token = 'mock_token';

        req.body = userData;

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(createdUser);
        jwt.sign.mockReturnValue(token);

        await authController.register(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
        expect(User.create).toHaveBeenCalledWith(userData);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({
            _id: createdUser._id,
            email: createdUser.email,
            token: token,
        });
    });

    it('should return 400 if user already exists', async () => {
        const userData = {
            email: 'existing@example.com',
            password: 'password123',
        };

        req.body = userData;

        User.findOne.mockResolvedValue({ email: 'existing@example.com' });

        await authController.register(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
        expect(User.create).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({
            message: 'User already exists',
        });
    });

    it('should return 400 if user creation fails (invalid data)', async () => {
         const userData = {
            email: 'test@example.com',
            password: 'password123',
        };

        req.body = userData;

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(null); // Simulate creation failure

        await authController.register(req, res);

        expect(User.create).toHaveBeenCalledWith(userData);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({
            message: 'Invalid user data',
        });
    });

    it('should return 500 if there is a server error', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
        };
        const errorMessage = 'Database error';

        req.body = userData;

        User.findOne.mockRejectedValue(new Error(errorMessage));

        await authController.register(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({
            message: errorMessage,
        });
    });
});
