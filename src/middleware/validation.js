const { body, query, param, validationResult } = require('express-validator');

// Helper functie om validatie errors te formatteren
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validatie fout',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Validatie voor News CREATE
const validateNewsCreate = [
    body('title')
        .trim()
        .notEmpty().withMessage('Titel is verplicht')
        .isLength({ min: 5 }).withMessage('Titel moet minimaal 5 karakters bevatten')
        .isLength({ max: 200 }).withMessage('Titel mag maximaal 200 karakters bevatten')
        .matches(/^[a-zA-Z0-9\s\-.,!?]+$/).withMessage('Titel mag alleen letters, cijfers en basis leestekens bevatten'),

    body('content')
        .trim()
        .notEmpty().withMessage('Inhoud is verplicht')
        .isLength({ min: 10 }).withMessage('Inhoud moet minimaal 10 karakters bevatten')
        .isLength({ max: 5000 }).withMessage('Inhoud mag maximaal 5000 karakters bevatten'),

    handleValidationErrors
];

// Validatie voor News UPDATE
const validateNewsUpdate = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID moet een geldig positief getal zijn'),

    body('title')
        .trim()
        .notEmpty().withMessage('Titel is verplicht')
        .isLength({ min: 5 }).withMessage('Titel moet minimaal 5 karakters bevatten')
        .isLength({ max: 200 }).withMessage('Titel mag maximaal 200 karakters bevatten')
        .matches(/^[a-zA-Z0-9\s\-.,!?]+$/).withMessage('Titel mag alleen letters, cijfers en basis leestekens bevatten'),

    body('content')
        .trim()
        .notEmpty().withMessage('Inhoud is verplicht')
        .isLength({ min: 10 }).withMessage('Inhoud moet minimaal 10 karakters bevatten')
        .isLength({ max: 5000 }).withMessage('Inhoud mag maximaal 5000 karakters bevatten'),

    handleValidationErrors
];

// Validatie voor Posts CREATE
const validatePostCreate = [
    body('content')
        .trim()
        .notEmpty().withMessage('Inhoud is verplicht')
        .isLength({ min: 10 }).withMessage('Inhoud moet minimaal 10 karakters bevatten')
        .isLength({ max: 1000 }).withMessage('Inhoud mag maximaal 1000 karakters bevatten'),

    body('user_id')
        .optional()
        .isInt({ min: 1 }).withMessage('User ID moet een geldig positief getal zijn'),

    handleValidationErrors
];

// Validatie voor Posts UPDATE
const validatePostUpdate = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID moet een geldig positief getal zijn'),

    body('content')
        .trim()
        .notEmpty().withMessage('Inhoud is verplicht')
        .isLength({ min: 10 }).withMessage('Inhoud moet minimaal 10 karakters bevatten')
        .isLength({ max: 1000 }).withMessage('Inhoud mag maximaal 1000 karakters bevatten'),

    handleValidationErrors
];

// Validatie voor ID parameter
const validateId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID moet een geldig positief getal zijn'),

    handleValidationErrors
];

// Validatie voor query parameters (limit, offset)
const validatePagination = [
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit moet tussen 1 en 100 zijn'),

    query('offset')
        .optional()
        .isInt({ min: 0 }).withMessage('Offset moet 0 of hoger zijn'),

    handleValidationErrors
];

// Validatie voor zoek query
const validateSearch = [
    query('q')
        .trim()
        .notEmpty().withMessage('Zoekterm (q) is verplicht')
        .isLength({ min: 2 }).withMessage('Zoekterm moet minimaal 2 karakters bevatten')
        .isLength({ max: 100 }).withMessage('Zoekterm mag maximaal 100 karakters bevatten'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit moet tussen 1 en 100 zijn'),

    query('offset')
        .optional()
        .isInt({ min: 0 }).withMessage('Offset moet 0 of hoger zijn'),

    handleValidationErrors
];

module.exports = {
    validateNewsCreate,
    validateNewsUpdate,
    validatePostCreate,
    validatePostUpdate,
    validateId,
    validatePagination,
    validateSearch
};
