const { check, validationResult } = require('express-validator');

exports.validateContactRequests = [
    check('name').isString().notEmpty().withMessage('Name is required'),
    check('email').isEmail().notEmpty().withMessage('Email is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
];
    