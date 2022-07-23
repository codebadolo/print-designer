const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
const path = require('path');

// Email config
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_POST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  secure: process.env.SMTP_POST == 465,
  tls: {
    rejectUnauthorized: false,
  },
});

nunjucks.configure('email/templates');

transport.use('compile', (mail, callback) => {

  if(mail.data.template){
    mail.data.html = nunjucks.render(`${mail.data.template}.njk`, mail.data.context);
  }
  
  callback();
})

module.exports = transport;