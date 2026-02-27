const httpMocks = require('node-mocks-http');
const { updateEvent } = require('../controllers/eventController');

// Mock the Event model with explicit mock implementation
jest.mock('../models/Event', () => ({
    findById: jest.fn()
}));

// Require the mocked model to access the mock function
const Event = require('../models/Event');

describe('Event Controller - updateEvent', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    it('should update an event successfully', async () => {
        const eventId = '609bda561452242d88d36e37';
        const initialEventData = {
            title: 'Old Title',
            date: new Date('2023-01-01'),
            description: 'Old Description',
            image: 'http://old.image',
            location: 'Old Location',
            save: jest.fn().mockResolvedValue({
                title: 'New Title',
                date: new Date('2023-12-31'),
                description: 'New Description',
                image: 'http://new.image',
                location: 'New Location'
            })
        };

        const updateData = {
            title: 'New Title',
            date: '2023-12-31',
            description: 'New Description',
            image: 'http://new.image',
            location: 'New Location'
        };

        req.params.id = eventId;
        req.body = updateData;

        // Mock findById to return the object with the save method
        Event.findById.mockResolvedValue(initialEventData);

        await updateEvent(req, res);

        expect(Event.findById).toHaveBeenCalledWith(eventId);
        expect(initialEventData.save).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        const responseData = res._getJSONData();
        expect(responseData.title).toBe(updateData.title);
        expect(responseData.description).toBe(updateData.description);
    });

    it('should return 404 if event is not found', async () => {
        const eventId = '609bda561452242d88d36e37';
        req.params.id = eventId;
        req.body = { title: 'New Title' };

        Event.findById.mockResolvedValue(null);

        await updateEvent(req, res);

        expect(Event.findById).toHaveBeenCalledWith(eventId);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Event not found' });
    });

    it('should return 400 if an error occurs', async () => {
        const eventId = '609bda561452242d88d36e37';
        req.params.id = eventId;
        req.body = { title: 'New Title' };

        const errorMessage = 'Database error';
        Event.findById.mockRejectedValue(new Error(errorMessage));

        await updateEvent(req, res);

        expect(Event.findById).toHaveBeenCalledWith(eventId);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: errorMessage });
    });
});
