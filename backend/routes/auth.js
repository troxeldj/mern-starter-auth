const router = require("express").Router()
const { check, body } = require("express-validator");
const { Login, Register, Logout, verifyUser } = require("../controllers/auth.js");
const { verifyBody } = require("../middleware/verification.js");
const { protect } = require("../middleware/auth.js");
const { authLimiter } = require("../util/limiter.js");

// Validation middleware for registration and login
// These middlewares check if the required fields are present and valid
// They normalize the email and check the length of the username and password
verifyRegister = [
  check('email').notEmpty().isEmail().normalizeEmail().isLength({ min: 10, max: 50 }),
  check('username').notEmpty().isLength({ min: 5, max: 20 }),
  check('password').notEmpty().isLength({ min: 6, max: 30 }),
  verifyBody
];

verifyLogin = [
  check('email').notEmpty().isEmail().normalizeEmail().isLength({ min: 10, max: 50 }),
  check('password').notEmpty().isLength({ min: 6, max: 30 }),
  verifyBody
]

// Routes for authentication
// These routes handle user registration, login, logout, and verification
// They use the validation middlewares defined above to ensure the data is valid before processing

// POST /api/auth/register
router.post("/register", authLimiter, verifyRegister, async (req, res) => { await Register(req, res) })
// POST /api/auth/login
router.post("/login", authLimiter, verifyLogin, async (req, res) => { await Login(req, res) });
// GET /api/auth/logout
router.get("/logout", protect, async (req, res) => { await Logout(req, res) });
// GET /api/auth/verify
router.get("/verify", protect, async (req, res) => { await verifyUser(req, res) });

module.exports = router;
