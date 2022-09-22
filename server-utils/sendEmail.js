// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')
// const sendgridTransport = require("nodemailer-sendgrid-transport")
sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendEmail = async (options) => {
  // const transporter = nodemailer.createTransport(

  const msg = {
    to: options.to, // Change to your recipient
    from: process.env.SENDER_EMAIL, // Change to your verified sender
    subject: options.subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: options.html,
  }

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  
};


module.exports = sendEmail;

