const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"GitHub" <${process.env.EMAIL_USER}>`, // Sender email
      to: "balajiashish02@gmail.com", // Recipient email
      subject: "hi", // Email subject
      text: "hi", // Email content (plain text)
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
sendMail();
module.exports = sendMail;
