var Users = require("../model/login.module");

var JWT = require("../common/_JWT");

exports.login = function (req, res) {
    var data = req.body;
    Users.loginModule(data, async function (repon) {
        if (repon) {
            const _token = await JWT.make(repon);
            res.send({ result: _token });
        }
    });
};

exports.register = function (req, res) {
    var data = req.body;
    Users.create(data, function (repon) {
        res.send({ result: repon });
    });
};

exports.updatePassword = function (req, res) {
    var data = req.body;
    Users.update(data, function (repon) {
        res.send({ result: repon });
    });
};
