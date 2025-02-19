var Showtime = require("../model/showtime.module");

exports.get_list = function (req, res) {
    Showtime.ShowtimeAll.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_list_movie = function (req, res) {
    Showtime.Showtime.get_showtime_movie(req.params.id, function (data) {
        res.send({ result: data });
    });
};
exports.get_list_time = function (req, res) {
    var data = req.body;
    Showtime.Showtime.get_showtime_movie_cinema(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.get_Detail_Showtime = function (req, res) {
    var data = req.body;
    Showtime.Showtime.get_detail_showtime(data, function (data) {
        res.send({ result: data });
    });
};
exports.get_Showtime_by_id = function (req, res) {
    var id = req.params.id;
    Showtime.ShowtimeAll.get_showtime_id(id, function (repon) {
        res.send({ result: repon });
    });
};

exports.addShowtime = function (req, res) {
    var data = req.body;
    Showtime.Showtime.create(data, function (repon) {
        res.send({ result: repon });
    });
};

exports.removeShowtime = function (req, res) {
    var id = req.params.id;
    Showtime.Showtime.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateShowtime = function (req, res) {
    var data = req.body;
    Showtime.Showtime.update(data, function (repon) {
        res.send({ result: repon });
    });
};
