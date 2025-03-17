import nodemailer from "nodemailer";

/* 
  createTransport is used to create a new transporter object that can be used to send emails.

  Here we are using nodemailer to send emails and mailtrap for testing.
*/
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export default transporter;
