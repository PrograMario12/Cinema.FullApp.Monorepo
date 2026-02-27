const authController = require('../../controllers/authController');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

// Mock User model and jsonwebtoken
jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller - Login', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    it('should login successfully with valid credentials', async () => {
        const mockUser = {
            _id: 'user_id',
            email: 'test@example.com',
            matchPassword: jest.fn().mockResolvedValue(true),
        };

        req.body = {
            email: 'test@example.com',
            password: 'password123',
        };

        User.findOne.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue('mock_token');

        await authController.login(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({
            _id: 'user_id',
            email: 'test@example.com',
            token: 'mock_token',
        });
    });

    it('should return 401 if user not found', async () => {
        req.body = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        User.findOne.mockResolvedValue(null);

        await authController.login(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
            message: 'Invalid email or password',
        });
    });

    it('should return 401 if password does not match', async () => {
        const mockUser = {
            _id: 'user_id',
            email: 'test@example.com',
            matchPassword: jest.fn().mockResolvedValue(false),
        };

        req.body = {
            email: 'test@example.com',
            password: 'wrongpassword',
        };

        User.findOne.mockResolvedValue(mockUser);

        await authController.login(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(mockUser.matchPassword).toHaveBeenCalledWith('wrongpassword');
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
            message: 'Invalid email or password',
        });
    });

    it('should handle server errors', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'password123',
        };

        const errorMessage = 'Database error';
        User.findOne.mockRejectedValue(new Error(errorMessage));

        await authController.login(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({
            message: errorMessage,
        });
    });
});
