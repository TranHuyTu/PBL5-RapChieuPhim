var Cinema = require("../model/cinema.module");

exports.get_list = function (req, res) {
    Cinema.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addCinema = function (req, res) {
    var data = req.body;
    Cinema.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeCinema = function (req, res) {
    var id = req.params.id;
    Cinema.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateCinema = function (req, res) {
    var data = req.body;
    Cinema.update(data, function (repon) {
        res.send({ result: repon });
    });
};
