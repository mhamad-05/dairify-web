const { body, param, validationResult } = require('express-validator');

const validateUser = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

    body('second_name')
        .trim()
        .notEmpty().withMessage('Second name is required')
        .isString().withMessage('Second name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Second name must be 2-50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be 8-50 characters')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)
        .withMessage('Password must contain 1 uppercase, 1 number, and 1 symbol'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];

const validateUserIDParam = [
    param('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer')
        .toInt(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    param: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];

const validateUserUpdate = [
    param('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer')
        .toInt(),

    body('first_name')
        .optional()
        .trim()
        .isString().withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

    body('second_name')
        .optional()
        .trim()
        .isString().withMessage('Second name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Second name must be 2-50 characters'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .optional()
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be 8-50 characters')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)
        .withMessage('Password must contain 1 uppercase, 1 number, and 1 symbol'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password is required'),

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
    validateUserUpdate,
    validateLogin
};