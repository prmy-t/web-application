// const Client = require("ftp");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

// Open template file
var source = fs.readFileSync(
  path.join(__dirname, "../templates/newCard.hbs"),
  "utf8"
);
// var bugReport = fs.readFileSync(
//   path.join(__dirname, "../templates/bug-report-email-template.hbs"),
//   "utf8"
// );
// Create email generator
var template = Handlebars.compile(source);

//Users object constructor
var Email = function (emailData) {
  this.to = emailData.to;
  this.bcc = emailData.bcc && emailData.bcc.length ? emailData.bcc : [];
  // this.cc = global.gConfig.authorized_cc_emils
  this.from = {
    email: "prameythumar3@gmail.com",
    name: "pramey",
  };
  this.subject = emailData.subject;
  this.html = template(emailData.data);
};

Email.send = async (emailData) => {
  const response = await sgMail.send(emailData);
  console.log(response);
};

module.exports = Email;
