const News = require('../models/News');

// GET /api/news - Haal alle news items op
exports.getAllNews = (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const news = News.getAll(limit, offset);
        const total = News.getCount();

        res.json({
            success: true,
            data: news,
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
            error: 'Fout bij ophalen van news items',
            message: error.message
        });
    }
};

// GET /api/news/:id - Haal één news item op
exports.getNewsById = (req, res) => {
    try {
        const { id } = req.params;
        const newsItem = News.getById(id);

        if (!newsItem) {
            return res.status(404).json({
                success: false,
                error: 'News item niet gevonden'
            });
        }

        res.json({
            success: true,
            data: newsItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij ophalen van news item',
            message: error.message
        });
    }
};

// GET /api/news/search - Zoek news items
exports.searchNews = (req, res) => {
    try {
        const { q, limit = 10, offset = 0 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Zoekterm (q) is verplicht'
            });
        }

        const news = News.search(q, parseInt(limit), parseInt(offset));

        res.json({
            success: true,
            data: news,
            searchTerm: q
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij zoeken van news items',
            message: error.message
        });
    }
};

// POST /api/news - Maak een nieuw news item aan
exports.createNews = (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Validatie
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: 'Title en content zijn verplicht'
            });
        }

        const newsItem = News.create({ title, content, author });

        res.status(201).json({
            success: true,
            data: newsItem,
            message: 'News item succesvol aangemaakt'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij aanmaken van news item',
            message: error.message
        });
    }
};

// PUT /api/news/:id - Update een news item
exports.updateNews = (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        // Check of news item bestaat
        const existingNews = News.getById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                error: 'News item niet gevonden'
            });
        }

        // Validatie
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: 'Title en content zijn verplicht'
            });
        }

        const updatedNews = News.update(id, { title, content, author });

        res.json({
            success: true,
            data: updatedNews,
            message: 'News item succesvol geüpdatet'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij updaten van news item',
            message: error.message
        });
    }
};

// DELETE /api/news/:id - Verwijder een news item
exports.deleteNews = (req, res) => {
    try {
        const { id } = req.params;

        // Check of news item bestaat
        const existingNews = News.getById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                error: 'News item niet gevonden'
            });
        }

        const deleted = News.delete(id);

        if (deleted) {
            res.json({
                success: true,
                message: 'News item succesvol verwijderd'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Fout bij verwijderen van news item'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Fout bij verwijderen van news item',
            message: error.message
        });
    }
};
