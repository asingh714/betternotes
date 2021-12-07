const nodemailer = require("nodemailer");
const nodeMailerConfig = require("./nodeMailerConfig");

// const sendEmail = async ({ to, subject, html }) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport(nodeMailerConfig);

//   return transporter.sendMail({
//     from: '"Aman" <foo@example.com', // sender address
//     to,
//     subject,
//     html,
//   });
// };

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "cf3xehritu4hltf6@ethereal.email",
      pass: "dVd64WHuXRrnrvQKZg",
    },
  });
  let info = await transporter.sendMail({
    from: '"Aman" <amsingh714@gmail.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Testing Email ", // Subject line
    text: "TESTING", // plain text body
    html: "<b>HI THIS IS A TEST</b>", // html body
  });
};

module.exports = sendEmail;
