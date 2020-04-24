require("dotenv").config();

const mailer = require("nodemailer");

const getEmailData = (to, firstname, lastname, course, text, template) => {
  let data = null;

  switch (template) {
    case "true":
      data = {
        from: `Notes App <projectnotesapp@gmail.com>`,
        to,
        subject: `Dudas de ${firstname} ${lastname}, Curso: ${course}`,
        text: `${text}`,
      };
      break;
    case "false":
      data = {
        from: `Notes App <projectnotesapp@gmail.com>`,
        to,
        subject: `Correo de ${firstname} ${lastname}, Profesor de: ${course}`,
        text: `${text}`,
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, firstname, lastname, course, text, template) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "projectnotesapp@gmail.com",
      pass: process.env.EMAILPASS,
    },
  });

  const mail = getEmailData(to, firstname, lastname, course, text, template);

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
