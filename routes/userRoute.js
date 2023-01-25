const router = require('express').Router();
const { registration, login } = require('../controllers/registration')
const { } = require('../controllers/jwt');

// /user
router.post('/register', registration);

router.post('/login', login);

router.get('/register', (req, res) => {
    res.render('registration')
});

router.get('/login', (req, res) => {
    res.render('login');
})
module.exports = router;