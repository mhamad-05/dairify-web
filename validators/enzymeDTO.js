const { body, param, validationResult } = require('express-validator');

const validateEnzyme = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('target_antibiotic')
        .isString()
        .withMessage('Target antibiotic must be a string')
        .notEmpty()
        .withMessage('Target antibiotic is required'),

    body('effectiveness_level')
        .isFloat({ min: 0, max: 1 })
        .withMessage('Effectiveness level must be between 0 and 1')
        .notEmpty()
        .withMessage('Effectiveness level is required'),
        body('effectiveness_level')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Effectiveness level must be between 0 and 100'),
    body('test_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Test ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEnzymeIDParam = [
    param('enzyme_id')
        .isInt({ min: 1 })
        .withMessage('Enzyme ID must be a positive integer')
        .notEmpty()
        .withMessage('Enzyme ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEnzymeNameParam = [
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

const validateEnzymeUpdate = [
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

    body('target_antibiotic')
        .optional()
        .isString()
        .withMessage('Target antibiotic must be a string'),

    body('effectiveness_level')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Effectiveness level must be between 0 and 100'),

    body('test_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Test ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateEnzyme,
    validateEnzymeIDParam,
    validateEnzymeNameParam,
    validateEnzymeUpdate
};