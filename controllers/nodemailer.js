const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (req, res) => {
    // console.log(req.body.email);
    const email = req.body.email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "sparsh.lohana@gmail.com",
            pass: "dkjpidkyfvovrjmx"
        }
    })

    const mailOptions = {
        from: "sparsh.lohana@gmail.com",
        to: email,
        subject: "Subscribed",
        text: "Thanks for Subscribing to our newsletter ;)"
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    })
    res.redirect('/home');
}

module.exports = sendMail;