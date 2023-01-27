const jwt = require("jsonwebtoken");


const createToken = async (payload) => {
    try {
        const token = await jwt.sign(payload, "ThisIsYourPrivateKey")
        return token
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req, res, next) => {
    try {
        let token = req.cookies.auth || req.query.token;
        const verify = jwt.verify(token, "ThisIsYourPrivateKey");

        if (verify?.userId) {
            res.locals.userId = verify?.userId;
        }
        next();
    } catch (error) {
        res.redirect("/user/login");
    }
}

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.adminAuthToken;
        const verify = jwt.verify(token, "ThisIsYourPrivateKey");
    } catch (error) {
        res.redirect("/admin/login");
    }
    next();
}
module.exports = {
    createToken,
    verifyToken,
    verifyAdminToken
}