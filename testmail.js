const nodemailer = require('nodemailer');

// Create a transporter object with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:465,
  secure:true,
  // Or use 'smtp' with specific SMTP host and port
  auth: {
    user: 'mytvdor@gmail.com', // Your Gmail email
    pass: 'fatu ftws zsbp fwnj ',  // Your Gmail password or app-specific password
  },
});

// Define the email options
const mailOptions = {
  from: 'mytvdor@gmail.com', // Sender address
  to: 'sumitdhonde0@gmail.com', // Receiver address
  subject: 'Test Email', // Subject of the email
  text: 'Hello, this is a test email!', // Email body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error while sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
