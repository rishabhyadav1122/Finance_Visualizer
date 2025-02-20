const { z } = require('zod');

const transactionValidator = z.object({
    amount: z.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number'
    }).positive("Amount must be a positive number"),

    date: z.coerce.date().default(new Date()),

    description: z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string'
    }).min(1, "Description cannot be empty"),

    // category: z.string().optional(),
});

module.exports = transactionValidator; 
