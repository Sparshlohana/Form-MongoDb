const router = require('express').Router();
const User = require('../models/registration')
const { verifyToken } = require('../controllers/jwt');
const sendMail = require('../controllers/nodemailer');

router.get('/', (req, res) => {
    res.redirect('/user/register');
})

router.post('/home', sendMail)
router.get('/home', verifyToken, async (req, res) => {
    const id = res.locals?.userID;
    const dbData = await User.findById({ _id: id })
    const username = dbData.name;
    res.render("index", { title: username });
})

module.exports = router;