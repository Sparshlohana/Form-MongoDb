const router = require('express').Router();
const { adminLogin, adminPanel, deleteUsers } = require('../controllers/admin');
const { verifyAdminToken } = require('../controllers/jwt');

router.post('/login', adminLogin);

router.get('/login', (req, res) => {
    res.render('admin');
});

router.post('/delete', deleteUsers)

router.get('/', verifyAdminToken, adminPanel);


module.exports = router