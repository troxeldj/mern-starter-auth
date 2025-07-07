const rateLimit = require("express-rate-limit");
const rateLimitMongo = require("rate-limit-mongo");

const authLimiter = rateLimit({
  store: new rateLimitMongo({
    uri: process.env.MONGO_URL,
    expireTimeMs: 15 * 60 * 1000,
    collectionName: "rateLimit",
    errorHandler: console.error,
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again later."
});


module.exports = {authLimiter};

