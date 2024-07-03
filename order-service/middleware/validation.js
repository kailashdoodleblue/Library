const { body, validationResult } = require('express-validator');

const validateOrder = [
    body('userName').isString().withMessage('Username must be a string').notEmpty().withMessage('Username is required'),
    body('returnDate').isISO8601().withMessage('Return date must be a valid date').notEmpty().withMessage('Return date is required'),
    body('bookName').isString().withMessage('Book name must be a string').notEmpty().withMessage('Book name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0').notEmpty().withMessage('Price is required'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports={validateOrder,handleValidationErrors}
