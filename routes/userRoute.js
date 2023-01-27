const router = require('express').Router();
const { registration, login } = require('../controllers/registration')
const { verifyToken } = require('../controllers/jwt');
const { forgotPassword, updatePassword } = require('../controllers/forgotPassword');

// /user
router.post('/register', registration);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', updatePassword)

router.get("/updatePassword", (req, res) => {

})

router.get('/register', (req, res) => {
    res.render('registration')
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword', {
        err: ''
    });
})

router.get('/resetPassword', verifyToken, (req, res) => {
    const id = res.locals?.userId;
    res.render('resetPassword', { userId: id });
})
module.exports = router;