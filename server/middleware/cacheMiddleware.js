// Middleware to set Cache-Control headers for public GET routes
// This helps significantly reduce load times by allowing the browser/Vercel CDN to cache responses

export const cacheMiddleware = (duration = 300) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method === 'GET') {
            // public: Can be cached by browser and CDN (Vercel)
            // max-age: How long the browser should keep it (in seconds)
            // s-maxage: How long the CDN should keep it
            // stale-while-revalidate: Allow serving stale content while fetching update in background
            res.set('Cache-Control', `public, max-age=${duration}, s-maxage=${duration}, stale-while-revalidate=59`);
        }
        next();
    };
};
