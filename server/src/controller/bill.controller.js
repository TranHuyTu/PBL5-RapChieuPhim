var Bill = require("../model/bill.module");

exports.get_list = function (req, res) {
    Bill.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_IDNewADD = function (req, res) {
    var id = req.params.id;
    Bill.get_IDNew(id, function (data) {
        res.send({ result: data });
    });
};
exports.addBill = function (req, res) {
    var data = req.body;
    Bill.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeBill = function (req, res) {
    var id = req.params.id;
    Bill.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateBill = function (req, res) {
    var data = req.body;
    Bill.update(data, function (repon) {
        res.send({ result: repon });
    });
};
