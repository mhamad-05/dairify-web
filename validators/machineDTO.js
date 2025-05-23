const { body, param, validationResult } = require('express-validator');

const validateMachine = [
    body('location')
        .isString()
        .withMessage('Location must be a string')
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters'),

    body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .isIn(['Active', 'Stopped'])
        .withMessage('Status must be either active or stopped'),

    body('sample_id')
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer')
        .notEmpty()
        .withMessage('Sample ID is required'),

    body('last_maintenance_date')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format (YYYY-MM-DD)')
        .notEmpty()
        .withMessage('Last maintenance date is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMachineIDParam = [
    param('machine_id')
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

const validateMachineUpdate = [
    param('machine_id')
        .isInt({ min: 1 })
        .withMessage('Machine ID must be a positive integer')
        .notEmpty()
        .withMessage('Machine ID is required'),

    body('location')
        .optional()
        .isString()
        .withMessage('Location must be a string')
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters'),

    body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .isIn(['Active', 'Stopped'])
        .withMessage('Status must be either active or stopped'),

    body('sample_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Sample ID must be a positive integer'),

    body('last_maintenance_date')
        .optional()
        .isISO8601()
        .withMessage('Date must be in ISO8601 format (YYYY-MM-DD)'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateMachine,
    validateMachineIDParam,
    validateMachineUpdate
};