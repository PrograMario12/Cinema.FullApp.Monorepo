const httpMocks = require('node-mocks-http');
const subscriberController = require('../../controllers/subscriberController');
const Subscriber = require('../../models/Subscriber');

jest.mock('../../models/Subscriber');

describe('Subscriber Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('getSubscribers', () => {
        it('should return all subscribers', async () => {
            const mockSubscribers = [
                { email: 'test1@example.com', isActive: true },
                { email: 'test2@example.com', isActive: false }
            ];
            Subscriber.find.mockResolvedValue(mockSubscribers);

            await subscriberController.getSubscribers(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockSubscribers);
            expect(Subscriber.find).toHaveBeenCalledWith({});
        });

        it('should handle errors and return 500 status', async () => {
            const errorMessage = 'Database error';
            Subscriber.find.mockRejectedValue(new Error(errorMessage));

            await subscriberController.getSubscribers(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: errorMessage });
        });
    });
});
