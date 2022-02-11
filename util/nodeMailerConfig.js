module.exports = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.email_username,
    pass: process.env.email_password,
  },
};
