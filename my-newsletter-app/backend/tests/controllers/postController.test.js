const { getPosts } = require('../../controllers/postController');
const Post = require('../../models/Post');

// Mock the Post model
jest.mock('../../models/Post');

describe('getPosts', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it('should return a list of posts sorted by creation date', async () => {
        const mockPosts = [
            { title: 'Post 1', content: 'Content 1', createdAt: new Date() },
            { title: 'Post 2', content: 'Content 2', createdAt: new Date() }
        ];

        // Mock the chain: Post.find().sort()
        const mockSort = jest.fn().mockResolvedValue(mockPosts);
        Post.find.mockReturnValue({ sort: mockSort });

        await getPosts(req, res);

        expect(Post.find).toHaveBeenCalled();
        expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should handle errors and return 500 status with error message', async () => {
        const errorMessage = 'Database error';

        // Mock the chain to throw an error
        const mockSort = jest.fn().mockRejectedValue(new Error(errorMessage));
        Post.find.mockReturnValue({ sort: mockSort });

        await getPosts(req, res);

        expect(Post.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
