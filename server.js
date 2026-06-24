<<<<<<< HEAD
require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const profileImagePath = path.join(__dirname, "image", "profile.jpeg");

app.get("/favicon.ico", (req, res) => {
  res.redirect(302, "/favicon.svg");
});

app.get(/^\/WhatsApp.*\.jpeg$/, (req, res) => {
  res.sendFile(profileImagePath);
});

app.use(express.static(__dirname));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanchanar6@gmail.com",
    pass: process.env.API_KEY,
  },
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: "sanchanar6@gmail.com",
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error");
    } else {
      res.status(200).send("Success");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (process.env.NODE_ENV !== "production") {
=======
require("dotenv").config(); const express = require("express"); const app = express(); const port = 3000; const path = require("path"); const nodemailer = require("nodemailer"); app.use(express.static(__dirname)); app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free'))); app.use(express.json()); const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'sanchanar6@gmail.com', pass: process.env.API_KEY } }); app.post("/api/contact", (req, res) => { const { name, email, subject, message } = req.body; const mailOptions = { from: email, to: 'sanchanar6@gmail.com', subject: `Portfolio Contact: ${subject}`, text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` }; transporter.sendMail(mailOptions, (error, info) => { if (error) { console.error(error); res.status(500).send('Error'); } else { res.status(200).send('Success'); } }); }); app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "index.html")); }); if (process.env.NODE_ENV !== 'production') {
>>>>>>> 300e359714e576b627c3480b9872d84497ab38b0
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
