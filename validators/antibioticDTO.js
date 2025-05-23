const { body, param, validationResult } = require('express-validator');

const validateAntibiotic = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('maximum_safe_concentration')
        .isFloat({ min: 0 })
        .withMessage('Maximum safe concentration must be a positive number')
        .notEmpty()
        .withMessage('Maximum safe concentration is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAntibioticIDParam = [
    param('antibiotic_id')
        .isInt({ min: 1 })
        .withMessage('Antibiotic ID must be a positive integer')
        .notEmpty()
        .withMessage('Antibiotic ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAntibioticNameParam = [
    param('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAntibioticUpdate = [
    param('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('maximum_safe_concentration')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum safe concentration must be a positive number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateAntibiotic,
    validateAntibioticIDParam,
    validateAntibioticNameParam,
    validateAntibioticUpdate
};