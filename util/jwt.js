const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    unique_user_id: user.unique_user_id,
    user_name: user.user_name,
    username: user.username,
    email: user.email,
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: process.env.JWT_LIFETIME,
  };

  return jwt.sign(payload, secret, options);
};

module.exports = {
  generateToken,
};
