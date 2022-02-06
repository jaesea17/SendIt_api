const nodemailer = require('nodemailer');

const sendEmail = (message) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: "033c8c2cb8867b",
            pass: "96301d9ee319c1"
        }
});

 message;

transporter.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
});
};

module.exports.sendEmail = sendEmail;
