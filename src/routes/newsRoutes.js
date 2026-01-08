const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// GET /api/news/search - Zoek news items (moet voor /:id staan!)
router.get('/search', newsController.searchNews);

// GET /api/news - Haal alle news items op
router.get('/', newsController.getAllNews);

// GET /api/news/:id - Haal één news item op
router.get('/:id', newsController.getNewsById);

// POST /api/news - Maak een nieuw news item aan
router.post('/', newsController.createNews);

// PUT /api/news/:id - Update een news item
router.put('/:id', newsController.updateNews);

// DELETE /api/news/:id - Verwijder een news item
router.delete('/:id', newsController.deleteNews);

module.exports = router;
