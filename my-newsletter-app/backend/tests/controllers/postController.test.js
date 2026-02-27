const { createPost } = require('../../controllers/postController');
const Post = require('../../models/Post');

jest.mock('../../models/Post');

describe('Post Controller - createPost', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                title: 'Test Post',
                content: 'This is a test post content',
                image: 'test-image.jpg'
            },
            user: {
                id: 'user123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should create a new post and return 201 status', async () => {
        const mockSave = jest.fn().mockResolvedValue({
            title: 'Test Post',
            content: 'This is a test post content',
            image: 'test-image.jpg',
            author: 'user123',
            _id: 'post123'
        });

        Post.mockImplementation(() => ({
            save: mockSave
        }));

        await createPost(req, res);

        expect(Post).toHaveBeenCalledWith({
            title: 'Test Post',
            content: 'This is a test post content',
            image: 'test-image.jpg',
            author: 'user123'
        });
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Test Post',
            content: 'This is a test post content'
        }));
    });

    it('should return 400 status if post creation fails', async () => {
        const errorMessage = 'Validation Error';
        const mockSave = jest.fn().mockRejectedValue(new Error(errorMessage));

        Post.mockImplementation(() => ({
            save: mockSave
        }));

        await createPost(req, res);

        expect(Post).toHaveBeenCalled();
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
