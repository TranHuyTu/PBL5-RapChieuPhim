var BlogFilm = require("../model/blogFilm.module");

exports.get_list = function (req, res) {
    BlogFilm.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addBlog = function (req, res) {
    var data = req.body;
    BlogFilm.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeBlog = function (req, res) {
    var id = req.params.id;
    BlogFilm.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateBlog = function (req, res) {
    var data = req.body;
    BlogFilm.update(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateBlogLike = function (req, res) {
    var data = req.body;
    BlogFilm.updateLike(data, function (repon) {
        res.send({ result: repon });
    });
};
