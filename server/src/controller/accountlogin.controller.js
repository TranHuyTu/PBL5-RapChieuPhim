var Account = require("../model/accountlogin.module");

exports.get_list = function (req, res) {
    var email = req.params.email;
    Account.get_all(email, function (data) {
        res.send({ result: data });
    });
};
exports.updateUser = function (req, res) {
    var data = req.body;
    Account.update(data, function (repon) {
        res.send({ result: repon });
    });
};
