const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASS,
  },
});

module.exports = transport;
