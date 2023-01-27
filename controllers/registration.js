const User = require('../models/registration')
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require('./jwt');

const registration = async (req, res) => {
    try {
        const body = req.body;
        const password = body.password;

        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        const sendDataObj = {
            email: body.email,
            name: body.name,
            password: hashPassword
        }
        const isExists = await User.findOne({ email: body.email });
        if (isExists) return res.status(400).json({ status: 'failed', reason: 'user already exists' });
        const saveUser = await new User(sendDataObj).save();
        console.log(saveUser);
        res.status(200).redirect('login');
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const isExists = await User.findOne({ email: email });
        const hashPassword = isExists.password;
        const checkPassword = await bcrypt.compare(password, hashPassword);

        if (checkPassword) {
            let payload = {
                userId: isExists._id
            }
            try {
                const token = await createToken(payload);
                res.cookie('auth', token, { maxAge: 60000 });
                res.redirect('/home');

            } catch (error) {
                console.log(`error generation token: ${error}`);
            }
        } else {
            res.send("Invalid Credentials")
        }
    } catch (error) {
        console.log(error);
        res.send("User not found")
    }
}

module.exports = {
    registration,
    login
}