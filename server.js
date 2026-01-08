const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (API documentatie)
app.use(express.static(path.join(__dirname, 'public')));

// Test route
app.get('/api', (req, res) => {
    res.json({
        message: 'Welkom bij de Receptenweb API',
        version: '1.0.0',
        endpoints: {
            documentation: '/',
            news: '/api/news',
            posts: '/api/posts'
        }
    });
});

// Routes
const newsRoutes = require('./src/routes/newsRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
app.use('/api/news', newsRoutes);
app.use('/api/posts', postsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Er is een fout opgetreden',
            status: err.status || 500
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Endpoint niet gevonden',
            status: 404
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
    console.log(`API documentatie: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
