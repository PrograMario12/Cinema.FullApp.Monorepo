const eventController = require('../../controllers/eventController');
const Event = require('../../models/Event');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/Event');

describe('Event Controller - getEvents', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should return 200 and a list of events sorted by date', async () => {
        const mockEvents = [
            { title: 'Event 1', date: new Date('2023-01-01') },
            { title: 'Event 2', date: new Date('2023-01-02') }
        ];

        // Mock chainable sort method
        Event.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockEvents)
        });

        await eventController.getEvents(req, res);

        expect(res.statusCode).toBe(200);

        const responseData = res._getJSONData();
        expect(responseData).toHaveLength(2);
        expect(responseData[0].title).toBe('Event 1');
        expect(responseData[0].date).toBe(mockEvents[0].date.toISOString());
        expect(responseData[1].title).toBe('Event 2');
        expect(responseData[1].date).toBe(mockEvents[1].date.toISOString());

        expect(Event.find).toHaveBeenCalled();
    });

    it('should return 500 and error message when fetching events fails', async () => {
        const errorMessage = 'Database error';
        Event.find.mockReturnValue({
            sort: jest.fn().mockRejectedValue(new Error(errorMessage))
        });

        await eventController.getEvents(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: errorMessage });
    });
});
