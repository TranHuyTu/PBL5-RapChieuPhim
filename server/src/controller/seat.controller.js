var Seat = require("../model/seat.module");

exports.get_list = function (req, res) {
    Seat.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addSeat = function (req, res) {
    var data = req.body;
    Seat.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeSeat = function (req, res) {
    var id = req.params.id;
    Seat.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateSeat = function (req, res) {
    var data = req.body;
    Seat.update(data, function (repon) {
        res.send({ result: repon });
    });
};
