var Directors = require("../model/directors.module");

exports.get_list = function (req, res) {
    Directors.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_director_movie = function (req, res) {
    Directors.get_detail(req.params.id, function (data) {
        res.send({ result: data });
    });
};
exports.addDirectors = function (req, res) {
    var data = req.body;
    Directors.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeDirectors = function (req, res) {
    var id = req.params.id;
    Directors.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateDirectors = function (req, res) {
    var data = req.body;
    Directors.update(data, function (repon) {
        res.send({ result: repon });
    });
};
