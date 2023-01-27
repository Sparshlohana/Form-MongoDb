const router = require('express').Router();
const { registration, login } = require('../controllers/registration')
const { } = require('../controllers/jwt');

// /user
router.post('/register', registration);

router.post('/login', login);

router.post('/forgotPassword', (req, res) => {
    const email = req.body.email
    if (email) {
        res.json({ message: "reset link has been sent to ", email })
    }
    else {
        res.render('forgotPassword', {
            err: 'Invalid email'
        })
    }
})

router.get('/register', (req, res) => {
    res.render('registration')
});

router.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword', {
        err: ''
    });
})

router.get('/login', (req, res) => {
    res.render('login');
})
module.exports = router;