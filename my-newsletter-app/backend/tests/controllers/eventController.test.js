const eventController = require('../../controllers/eventController');
const Event = require('../../models/Event');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/Event');

describe('Event Controller - createEvent', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should create an event successfully', async () => {
        const eventData = {
            title: 'Test Event',
            date: new Date().toISOString(), // Use ISO string to match JSON response
            description: 'Test Description',
            image: 'http://test.com/image.jpg',
            location: 'Test Location'
        };

        req.body = eventData;

        // Mock the save method
        const saveMock = jest.fn().mockResolvedValue(eventData);
        Event.mockImplementation(() => ({
            save: saveMock
        }));

        await eventController.createEvent(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(eventData);
        // Verify Event was called with the request body
        expect(Event).toHaveBeenCalledWith(expect.objectContaining(eventData));
    });

    it('should handle errors during event creation', async () => {
        const errorMessage = { message: 'Error creating event' };
        req.body = {};

        // Mock the save method to throw an error
        const saveMock = jest.fn().mockRejectedValue(new Error('Error creating event'));
        Event.mockImplementation(() => ({
            save: saveMock
        }));

        await eventController.createEvent(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual(errorMessage);
    });
});
