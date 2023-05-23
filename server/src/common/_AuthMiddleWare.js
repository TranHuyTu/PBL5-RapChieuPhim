let isAuth = async function (req, res, next) {
    var _JWT = require("../common/_JWT");
    var _token = req.headers.authorization;
    if (_token) {
        try {
            var authData = await _JWT.check(_token);
            req.auth = authData;
            next();
        } catch (error) {
            return res.send({ data: "Ma token ko hop le" });
        }
    } else {
        return res.send({ data: "Ban chua gui kem ma token" });
    }
    console.log(req.headers);
};

module.exports = {
    isAuth: isAuth,
};
