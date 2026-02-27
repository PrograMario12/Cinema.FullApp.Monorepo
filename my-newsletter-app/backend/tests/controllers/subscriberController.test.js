const { subscribe } = require('../../controllers/subscriberController');
const Subscriber = require('../../models/Subscriber');
const httpMocks = require('node-mocks-http');

// Mock the Subscriber model
jest.mock('../../models/Subscriber');

describe('Subscriber Controller - subscribe', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    it('should return 400 if subscriber already exists', async () => {
        const email = 'test@example.com';
        req.body = { email };

        // Mock Subscriber.findOne to return an existing subscriber
        Subscriber.findOne.mockResolvedValue({ email });

        await subscribe(req, res);

        expect(Subscriber.findOne).toHaveBeenCalledWith({ email });
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: 'Email already subscribed' });
    });

    it('should create a new subscriber if not exists', async () => {
        const email = 'new@example.com';
        req.body = { email };

        // Mock Subscriber.findOne to return null (not found)
        Subscriber.findOne.mockResolvedValue(null);

        // Mock Subscriber.create to return the created subscriber
        const createdSubscriber = { email, _id: 'mockId', createdAt: new Date() };
        Subscriber.create.mockResolvedValue(createdSubscriber);

        await subscribe(req, res);

        expect(Subscriber.findOne).toHaveBeenCalledWith({ email });
        expect(Subscriber.create).toHaveBeenCalledWith({ email });
        expect(res.statusCode).toBe(201);

        const jsonResponse = res._getJSONData();
        expect(jsonResponse.email).toEqual(createdSubscriber.email);
        expect(jsonResponse._id).toEqual(createdSubscriber._id);
        expect(jsonResponse.createdAt).toEqual(createdSubscriber.createdAt.toISOString());
    });

    it('should handle errors (e.g., database error)', async () => {
        const email = 'error@example.com';
        req.body = { email };
        const errorMessage = 'Database error';

        // Mock Subscriber.findOne to throw an error
        Subscriber.findOne.mockRejectedValue(new Error(errorMessage));

        await subscribe(req, res);

        expect(Subscriber.findOne).toHaveBeenCalledWith({ email });
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: errorMessage });
    });
});
