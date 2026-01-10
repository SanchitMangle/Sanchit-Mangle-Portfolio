import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'mongo-sanitize';

// Rate Limiting: Prevent brute-force and DoS
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 10000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 'fail',
        message: 'Too many requests from this IP, please try again after 15 minutes'
    }
});

// Stricter limiter for Auth routes (Login)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes (Relaxed for testing)
    max: 1000, // Increased limit for testing
    message: {
        status: 'fail',
        message: 'Too many login attempts, please try again after 15 minutes'
    }
});

// Security Middleware Function to apply all generic protections
export const configureSecurity = (app) => {
    // Set security HTTP headers
    app.use(helmet());

    // Data Sanitization against NoSQL query injection
    // (middleware wrapper around mongo-sanitize if needed, or manual usage)
    app.use((req, res, next) => {
        req.body = mongoSanitize(req.body);
        req.params = mongoSanitize(req.params);
        try {
            req.query = mongoSanitize(req.query);
        } catch (error) {
            // Fallback for read-only req.query (getter-only)
            if (req.query && typeof req.query === 'object') {
                for (const key in req.query) {
                    if (key.startsWith('$')) {
                        delete req.query[key];
                    }
                }
            }
        }
        next();
    });
};
