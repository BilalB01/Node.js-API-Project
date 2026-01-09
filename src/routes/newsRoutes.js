const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const {
    validateNewsCreate,
    validateNewsUpdate,
    validateId,
    validatePagination,
    validateSearch
} = require('../middleware/validation');

// GET /api/news/search - Zoek news items (moet voor /:id staan!)
router.get('/search', validateSearch, newsController.searchNews);

// GET /api/news - Haal alle news items op
router.get('/', validatePagination, newsController.getAllNews);

// GET /api/news/:id - Haal één news item op
router.get('/:id', validateId, newsController.getNewsById);

// POST /api/news - Maak een nieuw news item aan
router.post('/', validateNewsCreate, newsController.createNews);

// PUT /api/news/:id - Update een news item
router.put('/:id', validateNewsUpdate, newsController.updateNews);

// DELETE /api/news/:id - Verwijder een news item
router.delete('/:id', validateId, newsController.deleteNews);

module.exports = router;
