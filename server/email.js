require("dotenv").config();
const mailer = require("nodemailer");

  const mail = getEmailData(to, name, template) =>{
    let data = null;

    
  }


const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "projectnotesapp@gmail.com",
      pass: EMAILPASS,
    },
  });

  const mail = getEmailData(tp, name, type);

};
