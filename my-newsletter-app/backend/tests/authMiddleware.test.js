const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        process.env.JWT_SECRET = 'testsecret';
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 401 if no authorization header is present', () => {
        protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if authorization header does not start with Bearer', () => {
        req.headers.authorization = 'Basic token123';
        protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if token is invalid', () => {
        req.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('invalidtoken', 'testsecret');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should call next and set req.user if token is valid', () => {
        const user = { id: 'user123', name: 'Test User' };
        req.headers.authorization = 'Bearer validtoken';
        jwt.verify.mockReturnValue(user);

        protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('validtoken', 'testsecret');
        expect(req.user).toEqual(user);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});
