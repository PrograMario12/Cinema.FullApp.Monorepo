const { deletePost } = require('../../controllers/postController');
const Post = require('../../models/Post');
const httpMocks = require('node-mocks-http');

// Mock the Post model correctly, including static methods
jest.mock('../../models/Post', () => {
    return {
        findById: jest.fn(),
    };
});

describe('PostController.deletePost', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should delete a post if it exists', async () => {
        const postId = '12345';
        req.params.id = postId;

        const mockPost = {
            _id: postId,
            deleteOne: jest.fn().mockResolvedValue({})
        };

        // Setup the mock to return the mockPost
        Post.findById.mockResolvedValue(mockPost);

        await deletePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(mockPost.deleteOne).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Post removed' });
    });

    it('should return 404 if post is not found', async () => {
        const postId = '12345';
        req.params.id = postId;

        Post.findById.mockResolvedValue(null);

        await deletePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Post not found' });
    });

    it('should return 500 if server error occurs', async () => {
        const postId = '12345';
        req.params.id = postId;
        const errorMessage = 'Database error';

        Post.findById.mockRejectedValue(new Error(errorMessage));

        await deletePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: errorMessage });
    });
});
