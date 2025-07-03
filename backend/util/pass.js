const bcrypt = require("bcryptjs");

async function hashPass(pass) {
  return await bcrypt.hash(pass, 10);
}

module.exports = {
  hashPass
};
