const { body, param, validationResult } = require('express-validator');

const validateOrder = [
    body('order_date')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format (YYYY-MM-DD)')
        .notEmpty()
        .withMessage('Order date is required'),

    body('order_status')
        .isString()
        .withMessage('Order status must be a string')
        .notEmpty()
        .withMessage('Order status is required')
        .isIn(['Pending', 'Shipped', 'Delivered'])
        .withMessage('Invalid order status'),

    body('user_id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer')
        .notEmpty()
        .withMessage('User ID is required'),

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

const validateOrderIDParam = [
    param('order_id')
        .isInt({ min: 1 })
        .withMessage('Order ID must be a positive integer')
        .notEmpty()
        .withMessage('Order ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateOrderUpdate = [
    param('order_id')
        .isInt({ min: 1 })
        .withMessage('Order ID must be a positive integer')
        .notEmpty()
        .withMessage('Order ID is required'),

    body('order_status')
        .isString()
        .withMessage('Order status must be a string')
        .notEmpty()
        .withMessage('Order status is required')
        .isIn(['Pending', 'Shipped', 'Delivered'])
        .withMessage('Invalid order status'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateOrder,
    validateOrderIDParam,
    validateOrderUpdate
};