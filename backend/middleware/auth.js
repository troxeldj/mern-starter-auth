const jwt = require("jsonwebtoken");
// Ensure that the JWT_SECRET is set in the environment variables
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Middleware to protect routes
// This middleware checks for a valid JWT token in the request cookies
// If the token is valid, it attaches the user information to the request object
function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: "ERROR", message: "Unauthorized access. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ status: "ERROR", message: "Invalid token." });
  }
}

module.exports = {
  protect
};