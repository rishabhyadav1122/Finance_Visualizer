const validate = (schema) => async (req, res, next) => {
    try {
        console.log("Incoming Data:", req.body); // ✅ Debugging

        if (!schema) {
            return res.status(500).json({ error: "Validation schema is not defined" });
        }

        const parsedBody = await schema.parseAsync(req.body);  // Validate request body
        req.body = parsedBody;  // Replace request body with validated data
        next();
    } catch (err) {
        console.error("Validation Error:", err.errors); // ✅ Debugging

        const message = "Fill the details properly";
        const extraDetails = err.errors?.[0]?.message || "Invalid data";
        const status = 422;
        return res.status(422).json({
            message: "Validation failed",
            status,
            errors: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }))
        });
    }
};

module.exports = validate;
