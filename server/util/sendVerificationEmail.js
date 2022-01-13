const sendEmail = require("./sendEmail");

const sendVerificationEmail = ({
  user_name,
  email,
  verification_token,
  origin,
}) => {
  const verifyEmail = `${origin}/api/auth/verify-email?token=${verification_token}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${user_name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
