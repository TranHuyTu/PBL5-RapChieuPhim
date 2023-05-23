var Account = require("../model/account.module");

exports.get_list = function (req, res) {
    Account.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.updateUser = function (req, res) {
    var data = req.body;
    Account.update(data, function (repon) {
        res.send({ result: repon });
    });
};
