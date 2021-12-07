const nodemailer = require("nodemailer");
const nodeMailerConfig = require("./nodeMailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(nodeMailerConfig);
  return transporter.sendMail({
    from: process.env.my_email, // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
