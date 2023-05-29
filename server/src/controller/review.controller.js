var Review = require("../model/review.module");

exports.get_list = function (req, res) {
    Review.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.addReview = function (req, res) {
    var data = req.body;
    Review.create(data, function (repon) {
        res.send({ result: repon });
    });
};
exports.removeReview = function (req, res) {
    var id = req.params.id;
    Review.remove(id, function (repon) {
        res.send({ result: repon });
    });
};
exports.updateReview = function (req, res) {
    var data = req.body;
    Review.update(data, function (repon) {
        res.send({ result: repon });
    });
};
