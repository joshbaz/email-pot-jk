const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/mailnormal", (req, res, next) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let phone = req.body.number;
  let platform = req.body.platform; // optional, only for my use

  /**
   * create the transport for nodemailer
   * nodemailer.createTransport() function
   */

  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: process.env.PORTMAIL,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSKEY,
    },
  });

  /**
   * mail details
   * @from - sender email (usually the auth username)
   * @to - to where the email should be received
   * @subject - Topic of mail if available
   * @html - body of the mail / file
   */

  let mailOptions = {
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER, //from my website to my email
    subject: `New Mail from ${platform} `,
    html: `
    <h5>firstname : ${firstname}</h5><br/>
    <h5>lastname : ${lastname}</h5><br/>
    <h5>email: ${email}</h5><br/>
    <h5>phonenumber: ${phone}</h5>
    `,
  };

  //send the mail
  //sendMail(mailOptions)
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json("sending mail failed");
      console.log(err);
    } else {
      res.status(200).json("Email send successfully");
    }
  });
});

module.exports = router;
