const sendEmail = require("./sendEmail");

const sendVerificationEmail = ({
  user_name,
  email,
  // verification_token,
  // origin,
}) => {
  // token=${verification_token}&
  // const verifyEmail = `${origin}/api/auth/verify-email?email=${email}`;

  // const message = `<p>Please confirm your email by clicking on the following link :
  // <a href="${verifyEmail}">Verify Email</a> </p>`;

  const message = `<p>We are happy to have you on board! Ready to buy or sell your notes?</p>`;

  return sendEmail({
    to: email,
    subject: "Welcome to BetterNote!",
    html: `<h4> Hello, ${user_name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
