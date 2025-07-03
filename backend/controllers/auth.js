const User = require("../models/user.js");
const { generateToken, verifyToken } = require("../util/jwt.js");
const bcrypt = require("bcryptjs");

// POST /login
// This function handles user login by checking the provided email and password.
// If the credentials are valid, it generates a JWT token and sets it in a cookie.
// If the credentials are invalid, it returns an error message.
async function Login(req, res) {

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ status: "ERROR", message: `Unable to login. Please check credentials.` })
  }
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return res.status(401).json({ status: "ERROR", message: `Unable to login. Please check credentials.` })
  }
  const retObj = {
    username: user.username,
    email: user.email,
  };
  const token = generateToken(retObj);
  // set expiration to 7 days
  retObj.token_exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  res.status(200).json({ status: "SUCCESS", message: retObj });
}

// POST /register
// This function handles user registration by checking if the username or email already exists.
// If they do not exist, it creates a new user and generates a JWT token.
// If the username or email already exists, it returns an error message.
//
async function Register(req, res) {
  const { username, email, password } = req.body;

  // check if username already taken
  const user = await User.findOne({
    $or: [
      { email: email },
      { username: username }
    ]
  });
  if (user) {
    return res.status(409).json({ status: "ERROR", message: `User with username ${username} or email ${email} already exists.` })
  }
  const newUser = new User({
    username: username,
    password: password,
    email: email
  });

  await newUser.save();

  const retObj = {
    username: newUser.username,
    email: newUser.email,
  }

  const token = generateToken(retObj)
  retObj.token = token;


  return res.status(201).json({ status: "SUCCESS", message: retObj })
}

// POST /verify
// This function verifies the JWT token provided in the cookies.
// If the token is valid, it returns the decoded user information.
// If the token is invalid or not present, it returns an error message.
//
async function verifyUser(req, res) {
  if (!req.cookies.token) {
    return res.status(401).json({ status: "ERROR", message: "Unauthorized access. No token provided." });
  }
  try {
    const decoded = verifyToken(req.cookies.token);

    const retObj = {
      username: decoded.username,
      email: decoded.email,
      token_exp: new Date(decoded.exp * 1000),
      is_expired: Date.now() > decoded.exp * 1000 // Check if token is expired
    }
    return res.status(200).json({ status: "SUCCESS", message: retObj });
  } catch (err) {
    return res.status(401).json({ status: "ERROR", message: "Invalid token." });
  }
}

// POST /logout
// This function clears the cookie containing the JWT token and returns a success message.
// If the token is not present, it returns an error message.
//
async function Logout(req, res) {
  if (!req.cookies.token) {
    return res.status(401).json({ status: "ERROR", message: "Unauthorized access. No token provided." });
  }
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  return res.status(200).json({ status: "SUCCESS", message: "Logged out successfully." });
}

module.exports = {
  Login,
  Register,
  Logout,
  verifyUser
}

