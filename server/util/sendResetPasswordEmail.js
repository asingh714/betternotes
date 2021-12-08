const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = ({
  name,
  email,
  verification_token,
  origin,
}) => {
  const verifyEmail = `${origin}/api/auth/reset-password?token=${verification_token}&email=${email}`;

  const message = `<p>Please reset your password by clicking the following link : 
  <a href="${verifyEmail}">Reset Password</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendResetPasswordEmail;
