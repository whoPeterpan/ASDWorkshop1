let cache = {};

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    if (cache[key]) {

        const age = Date.now() - cache[key].createdAt;

        if (age < TTL) {
            res.set("X-Cache", "HIT");
            return res.json(cache[key].data);
        }

        delete cache[key];
    }

    res.set("X-Cache", "MISS");

    next();
}

function setCache(key, data) {
    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}

function clearCache() {
    cache = {};
}

module.exports = {
    cacheMiddleware,
    setCache,
    clearCache
};