const Posts = require('../models/Posts');

// GET /api/posts - Haal alle posts op
exports.getAllPosts = (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const posts = Posts.getAll(limit, offset);
        const total = Posts.getCount();

        res.json({
            success: true,
            data: posts,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij ophalen van posts',
            message: error.message
        });
    }
};

// GET /api/posts/:id - Haal één post op
exports.getPostById = (req, res) => {
    try {
        const { id } = req.params;
        const post = Posts.getById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post niet gevonden'
            });
        }

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij ophalen van post',
            message: error.message
        });
    }
};

// GET /api/posts/search - Zoek posts
exports.searchPosts = (req, res) => {
    try {
        const { q, limit = 10, offset = 0 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Zoekterm (q) is verplicht'
            });
        }

        const posts = Posts.search(q, parseInt(limit), parseInt(offset));

        res.json({
            success: true,
            data: posts,
            searchTerm: q
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij zoeken van posts',
            message: error.message
        });
    }
};

// POST /api/posts - Maak een nieuwe post aan
exports.createPost = (req, res) => {
    try {
        const { content, user_id } = req.body;

        // Validatie
        if (!content) {
            return res.status(400).json({
                success: false,
                error: 'Content is verplicht'
            });
        }

        const post = Posts.create({ content, user_id });

        res.status(201).json({
            success: true,
            data: post,
            message: 'Post succesvol aangemaakt'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij aanmaken van post',
            message: error.message
        });
    }
};

// PUT /api/posts/:id - Update een post
exports.updatePost = (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // Check of post bestaat
        const existingPost = Posts.getById(id);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                error: 'Post niet gevonden'
            });
        }

        // Validatie
        if (!content) {
            return res.status(400).json({
                success: false,
                error: 'Content is verplicht'
            });
        }

        const updatedPost = Posts.update(id, { content });

        res.json({
            success: true,
            data: updatedPost,
            message: 'Post succesvol geüpdatet'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij updaten van post',
            message: error.message
        });
    }
};

// DELETE /api/posts/:id - Verwijder een post
exports.deletePost = (req, res) => {
    try {
        const { id } = req.params;

        // Check of post bestaat
        const existingPost = Posts.getById(id);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                error: 'Post niet gevonden'
            });
        }

        const deleted = Posts.delete(id);

        if (deleted) {
            res.json({
                success: true,
                message: 'Post succesvol verwijderd'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Fout bij verwijderen van post'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij verwijderen van post',
            message: error.message
        });
    }
};
