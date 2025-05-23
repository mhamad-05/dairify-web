const { body, param, validationResult } = require('express-validator');

const validateTestResult = [
    body('sample_id')
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer')
        .notEmpty()
        .withMessage('Sample ID is required'),

    body('result_status')
        .isString()
        .withMessage('Result status must be a string')
        .notEmpty()
        .withMessage('Result status is required')
        .isIn(['Detected', 'Clean'])
        .withMessage('Result status must be either detected or clean'),

    body('antibiotic_id')
        .isInt({ min: 1 })
        .withMessage('Antibiotic ID must be a positive integer')
        .notEmpty()
        .withMessage('Antibiotic ID is required'),

    body('enzyme_id')
        .isInt({ min: 1 })
        .withMessage('Enzyme ID must be a positive integer')
        .notEmpty()
        .withMessage('Enzyme ID is required'),

    body('research_id')
    .optional()
        .isInt({ min: 1 })
        .withMessage('Research ID must be a positive integer')
        .notEmpty()
        .withMessage('Research ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTestIDParam = [
    param('test_id')
        .isInt({ min: 1 })
        .withMessage('Test ID must be a positive integer')
        .notEmpty()
        .withMessage('Test ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTestResultUpdate = [
    param('test_id')
        .isInt({ min: 1 })
        .withMessage('Test ID must be a positive integer')
        .notEmpty()
        .withMessage('Test ID is required'),

    body('sample_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer'),

    body('result_status')
        .optional()
        .isString()
        .withMessage('Result status must be a string')
        .isIn(['Detected', 'Clean'])
        .withMessage('Result status must be either detected or clean'),

    body('antibiotic_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Antibiotic ID must be a positive integer'),

    body('enzyme_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Enzyme ID must be a positive integer'),

    body('research_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Research ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateTestResult,
    validateTestIDParam,
    validateTestResultUpdate
};