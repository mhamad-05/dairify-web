const { body, param, validationResult } = require('express-validator');

const validateUser = [
    body('first_name')
        .isString()
        .withMessage('First name must be a string')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),

    body('second_name')
        .isString()
        .withMessage('Second name must be a string')
        .notEmpty()
        .withMessage('Second name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Second name must be between 2 and 50 characters'),

    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    body('order_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserIDParam = [
    param('user_id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer')
        .notEmpty()
        .withMessage('User ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserUpdate = [
    param('user_id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer')
        .notEmpty()
        .withMessage('User ID is required'),

    body('first_name')
        .optional()
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),

    body('second_name')
        .optional()
        .isString()
        .withMessage('Second name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Second name must be between 2 and 50 characters'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .optional()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    body('order_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateUserIDParam,
    validateUserUpdate
};