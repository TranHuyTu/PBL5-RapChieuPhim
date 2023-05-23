var Halls = require("../model/halls.module");

//Chưa sửa
exports.get_list = function (req, res) {
    Halls.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_list_seat = function (req, res) {
    Halls.get_halls_showtime(req.params.id, function (data) {
        res.send({ result: data });
    });
};
//Chưa sửa
exports.addHalls = function (req, res) {
    var data = req.body;
    Halls.create(data, function (repon) {
        res.send({ result: repon });
    });
};
//Chưa sửa
exports.removeHalls = function (req, res) {
    var id = req.params.id;
    Halls.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
//Chưa sửa
exports.updateHalls = function (req, res) {
    var data = req.body;
    Halls.update(data, function (repon) {
        res.send({ result: repon });
    });
};
