const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const {
    validatePostCreate,
    validatePostUpdate,
    validateId,
    validatePagination,
    validateSearch
} = require('../middleware/validation');

// GET /api/posts/search - Zoek posts (moet voor /:id staan!)
router.get('/search', validateSearch, postsController.searchPosts);

// GET /api/posts - Haal alle posts op
router.get('/', validatePagination, postsController.getAllPosts);

// GET /api/posts/:id - Haal één post op
router.get('/:id', validateId, postsController.getPostById);

// POST /api/posts - Maak een nieuwe post aan
router.post('/', validatePostCreate, postsController.createPost);

// PUT /api/posts/:id - Update een post
router.put('/:id', validatePostUpdate, postsController.updatePost);

// DELETE /api/posts/:id - Verwijder een post
router.delete('/:id', validateId, postsController.deletePost);

module.exports = router;
