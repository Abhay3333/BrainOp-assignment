const e = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();


const email = process.env.GMAIL_ADDRESS;
const password = process.env.GMAIL_PASSWORD;

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: email ,
      pass: password
    }
  });

  const mailOptions = {
    from: email,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
