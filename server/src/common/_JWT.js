const jwt = require("jsonwebtoken");
const _APP = require("./_APP");

let make = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { data: user },
            _APP.ACCESS_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: _APP.TOKEN_TIME_LITE,
            },
            function (err, _token) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(_token);
                }
            },
        );
    });
};

let check = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, _APP.ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                return reject(err);
            } else {
                return resolve(decoded);
            }
        });
    });
};

module.exports = {
    make: make,
    check: check,
};
