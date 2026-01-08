const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// GET /api/posts/search - Zoek posts (moet voor /:id staan!)
router.get('/search', postsController.searchPosts);

// GET /api/posts - Haal alle posts op
router.get('/', postsController.getAllPosts);

// GET /api/posts/:id - Haal één post op
router.get('/:id', postsController.getPostById);

// POST /api/posts - Maak een nieuwe post aan
router.post('/', postsController.createPost);

// PUT /api/posts/:id - Update een post
router.put('/:id', postsController.updatePost);

// DELETE /api/posts/:id - Verwijder een post
router.delete('/:id', postsController.deletePost);

module.exports = router;
