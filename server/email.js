require("dotenv").config();

const mailer = require("nodemailer");

const getEmailData = (to, firstname, lastname, course, text) => {
  data = {
    from: `Notes App <projectnotesapp@gmail.com>`,
    to,
    subject: `Dudas de ${firstname} ${lastname}, Curso: ${course}`,
    text: `${text}`,
  };
  return data;
};

const sendEmail = (to, firstname, lastname, course, text) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "projectnotesapp@gmail.com",
      pass: process.env.EMAILPASS,
    },
  });

  const mail = getEmailData(to, firstname, lastname, course, text);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
