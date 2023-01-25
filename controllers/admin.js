const bcrypt = require('bcrypt');
const User = require('../models/registration');
const jwt = require('./jwt');

const adminLogin = async (req, res) => {
    try {
        const admin = {
            email: "sparsh.lohana@gmail.com",
            password: "123"
        }

        const email = req.body.email;
        const password = req.body.password;

        if (email === admin.email) {
            const verifyData = await User.findOne({ email: email });
            const id = verifyData._id;
            const payload = {
                id: id
            };
            const hashPassword = await bcrypt.compare(password, verifyData.password);
            if (hashPassword) {
                const token = await jwt.createToken(payload);
                res.cookie('adminAuthToken', token, { maxAge: 60000 });
                res.redirect('/admin');
            }
            else {
                res.json({
                    error: 404,
                    message: "invalid credentials"
                });
            }
        } else {
            res.json({
                error: 401,
                message: "Access denied"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const adminPanel = async (req, res) => {
    try {
        const allDataFromDb = await User.find({});
        res.render('adminPanel', { data: allDataFromDb });
    } catch (error) {
        console.log(error);
    }
};

const deleteUsers = async (req, res) => {
    const email = req.body.email;
    const allDataFromDb = await User.deleteOne({ email: email });
    res.redirect('/admin');
}


module.exports = {
    adminLogin,
    adminPanel,
    deleteUsers,
}
