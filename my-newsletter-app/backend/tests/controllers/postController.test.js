const httpMocks = require('node-mocks-http');
const postController = require('../../controllers/postController');
const Post = require('../../models/Post');

jest.mock('../../models/Post');

describe('PostController - updatePost', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should update a post successfully', async () => {
        const postId = 'post123';
        const initialPost = {
            _id: postId,
            title: 'Old Title',
            content: 'Old Content',
            image: 'old.jpg',
            save: jest.fn().mockResolvedValue({
                _id: postId,
                title: 'New Title',
                content: 'New Content',
                image: 'new.jpg'
            })
        };

        Post.findById.mockResolvedValue(initialPost);

        req.params.id = postId;
        req.body = {
            title: 'New Title',
            content: 'New Content',
            image: 'new.jpg'
        };

        await postController.updatePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(initialPost.title).toBe('New Title');
        expect(initialPost.content).toBe('New Content');
        expect(initialPost.image).toBe('new.jpg');
        expect(initialPost.save).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        const responseData = res._getJSONData();
        expect(responseData.title).toBe('New Title');
    });

    it('should update only provided fields', async () => {
        const postId = 'post123';
        const initialPost = {
            _id: postId,
            title: 'Old Title',
            content: 'Old Content',
            image: 'old.jpg',
            save: jest.fn().mockResolvedValue({
                _id: postId,
                title: 'New Title',
                content: 'Old Content', // Unchanged
                image: 'old.jpg' // Unchanged
            })
        };

        Post.findById.mockResolvedValue(initialPost);

        req.params.id = postId;
        req.body = {
            title: 'New Title'
        };

        await postController.updatePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(initialPost.title).toBe('New Title');
        expect(initialPost.content).toBe('Old Content'); // Should remain unchanged
        expect(initialPost.image).toBe('old.jpg'); // Should remain unchanged
        expect(initialPost.save).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });

    it('should return 404 if post not found', async () => {
        const postId = 'nonexistent';
        Post.findById.mockResolvedValue(null);

        req.params.id = postId;
        req.body = { title: 'New Title' };

        await postController.updatePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Post not found' });
    });

    it('should return 400 if an error occurs', async () => {
        const postId = 'post123';
        const errorMessage = 'Database error';
        Post.findById.mockRejectedValue(new Error(errorMessage));

        req.params.id = postId;
        req.body = { title: 'New Title' };

        await postController.updatePost(req, res);

        expect(Post.findById).toHaveBeenCalledWith(postId);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: errorMessage });
    });
});
