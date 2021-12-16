const sendEmail = require("./sendEmail");

const sendOrderEmail = ({ email, document, name }) => {
  const message = `<p>Your note is at the following link: 
  <a href="${document}">Note</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Order Confirmation",
    html: `<h4> Hello, ${name} </h4>
    ${message}
    `,
  });
};

module.exports = sendOrderEmail;
