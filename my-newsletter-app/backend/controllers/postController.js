const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private (Admin)
exports.createPost = async (req, res) => {
    const { title, content, image } = req.body;

    try {
        const post = new Post({
            title,
            content,
            image,
            author: req.user.id
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin)
exports.updatePost = async (req, res) => {
    const { title, content, image } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            post.title = title || post.title;
            post.content = content || post.content;
            post.image = image || post.image;

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin)
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
