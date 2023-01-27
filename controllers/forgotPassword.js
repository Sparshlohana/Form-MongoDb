const User = require('../models/registration');
const nodemailer = require('nodemailer');
const jwt = require('../controllers/jwt');
const bcrypt = require('bcrypt');

const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({
                status: 404,
                message: "User not found"
            })
        }
        const payload = { userId: user._id };

        const token = await jwt.createToken(payload);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sparsh.lohana@gmail.com",
                pass: "dkjpidkyfvovrjmx"
            }
        });

        const mailOptions = {
            from: "sparsh.lohana@gmail.com",
            to: email,
            subject: "Resent your Password",
            html: `<p>Click <a href="http://localhost:5000/user/resetPassword?token=${token}">here</a> to reset your password</p>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.json({
                    statusCode: 500,
                    error: err
                });
            }
            else {
                console.log("Reset link sent");
                res.json({
                    statusCode: 200,
                    message: 'Password reset link sent'
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.body.userId;
        const body = req.body;
        const { password, confirmPassword } = body
        if (password == confirmPassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.findByIdAndUpdate({ _id: id }, { password: hashPassword }, { new: true });
            console.log(user);
            res.json({
                statusCode: 200,
                message: 'Password updated successfully'
            })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    forgotPassword,
    updatePassword
}