const { body, param, validationResult } = require('express-validator');

const validateFoodSample = [
    body('status')
        .isString()
        .withMessage('Status must be a string')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['L', 'S'])
        .withMessage('Status must be either L(Liquid) or S(Solid)'),

    body('date_collected')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format (YYYY-MM-DD)')
        .notEmpty()
        .withMessage('Date collected is required'),

    body('machine_id')
        .isInt({ min: 1 })
        .withMessage('Machine ID must be a positive integer')
        .notEmpty()
        .withMessage('Machine ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateSampleIDParam = [
    param('sample_id')
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer')
        .notEmpty()
        .withMessage('Sample ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateFoodSampleUpdate = [
    param('sample_id')
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer')
        .notEmpty()
        .withMessage('Sample ID is required'),

    body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .isIn(['L', 'S'])
        .withMessage('Status must be either L(liquid) or S(solid)'),

    body('date_collected')
        .optional()
        .isISO8601()
        .withMessage('Date must be in ISO8601 format (YYYY-MM-DD)'),

    body('machine_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Machine ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateFoodSample,
    validateSampleIDParam,
    validateFoodSampleUpdate
};