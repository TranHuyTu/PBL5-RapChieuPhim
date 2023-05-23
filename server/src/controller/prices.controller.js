var Prices = require("../model/prices.module");

exports.get_list = function (req, res) {
    Prices.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addPrices = function (req, res) {
    var data = req.body;
    Prices.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removePrices = function (req, res) {
    var id = req.params.id;
    Prices.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updatePrices = function (req, res) {
    var data = req.body;
    Prices.update(data, function (repon) {
        res.send({ result: repon });
    });
};
