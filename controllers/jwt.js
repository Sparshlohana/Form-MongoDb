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
        const token = req.cookies.auth;
        const verify = jwt.verify(token, "ThisIsYourPrivateKey");

        if (verify?.userID) {
            res.locals.userID = verify?.userID;

        }
        console.log(verify);
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