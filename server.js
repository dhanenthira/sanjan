require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;
const profileImagePath = path.join(__dirname, "image", "profile.jpeg");

// Serve favicon
app.get("/favicon.ico", (req, res) => {
  res.redirect(302, "/favicon.svg");
});

// Legacy WhatsApp image URL redirect → real profile image
app.get(/^\/WhatsApp.*\.jpeg$/, (req, res) => {
  res.sendFile(profileImagePath);
});

// Serve fontawesome from node_modules if installed
app.use(
  "/fontawesome",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
  )
);

// Serve all static files (including /image/profile.jpeg)
app.use(express.static(__dirname));
app.use(express.json());

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanchanar6@gmail.com",
    pass: process.env.API_KEY,
  },
});

// Contact form API
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

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
