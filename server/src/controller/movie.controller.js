var Movie = require("../model/movie.module");

exports.get_list = function (req, res) {
    Movie.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addMovie = function (req, res) {
    var data = req.body;
    Movie.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeMovie = function (req, res) {
    var id = req.params.id;
    Movie.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateMovie = function (req, res) {
    var data = req.body;
    Movie.update(data, function (repon) {
        res.send({ result: repon });
    });
};
