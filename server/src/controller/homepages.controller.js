var Movie = require("../model/homepages.module");

exports.getHomePage = function (req, res) {
    Movie.get_all_movie(function (data) {
        res.send({ result: data });
    });
};
exports.getDetailMovie = function (req, res) {
    var id = req.params.id;
    Movie.get_detail_movie(id, function (repon) {
        res.send({ result: repon });
    });
};
