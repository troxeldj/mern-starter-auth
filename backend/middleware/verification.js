const { validationResult } = require("express-validator");


function verifyBody(req, res, next) {
  const errors = validationResult(req);

  if (!(errors.isEmpty())) {
    return res.status(400).json({ status: "ERROR", message: errors.array() });
  }
  next();
};


module.exports = {
  verifyBody
};
