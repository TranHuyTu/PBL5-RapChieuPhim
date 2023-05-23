var BlogMovie = require("../model/blogMovie.module");

exports.get_list = function (req, res) {
    BlogMovie.get_all(function (data) {
        res.send({ result: data });
    });
};
