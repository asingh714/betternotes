const nodeMailerConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.PORT.email_username,
    pass: process.env.PORT.email_password,
  },
};
module.exports = nodeMailerConfig;
