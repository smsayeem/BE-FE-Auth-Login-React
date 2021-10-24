// generate token using secret key from process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

/*
 * @function:generateToken
 * @params: user
 * @description: it generates token for the user. we need basic user details (i.e. id, name, role, etc) and secret key (mentioned in .env file). Make sure don’t use password and other sensitive information in user details to create token.
 * return: auth token
 */
function generateToken(user) {
  if (!user) return null;

  const userInfo = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
}

/*
 * @function:getCleanUser
 * @params: user
 * @description: return basic user details
 * return: user
 */
function getCleanUser(user) {
  if (!user) return null;
  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
};
